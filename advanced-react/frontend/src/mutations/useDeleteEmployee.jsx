import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEmployee } from "../api/employeeApi";
import { employeeKeys } from "../queries/employeeKeys";

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEmployee,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: employeeKeys.all,
      });

      const previousEmployees = queryClient.getQueryData(employeeKeys.all);

      queryClient.setQueryData(employeeKeys.all, (old) => {
        if (!old) return old;

        return old.filter((emp) => emp.id !== id);
      });

      return { previousEmployees };
    },

    onError: (err, id, context) => {
      if (context?.previousEmployees) {
        queryClient.setQueryData(employeeKeys.all, context.previousEmployees);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: employeeKeys.all,
      });
    },
  });
};
