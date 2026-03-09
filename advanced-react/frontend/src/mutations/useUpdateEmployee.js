import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateEmployee } from "../api/employeeApi";
import { employeeKeys } from "../queries/employeeKeys";

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEmployee,

    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({
        queryKey: employeeKeys.all,
      });

      const previousEmployees = queryClient.getQueryData(employeeKeys.all);

      queryClient.setQueryData(employeeKeys.all, (old) => {
        if (!old) return old;

        return old.map((emp) => (emp.id === id ? { ...emp, ...data } : emp));
      });

      return { previousEmployees };
    },

    onError: (err, variables, context) => {
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
