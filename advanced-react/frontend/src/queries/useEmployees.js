import { useQuery } from "@tanstack/react-query";
import { fetchEmployees } from "../api/employeeApi";
import { employeeKeys } from "./employeeKeys";

export const useEmployees = () => {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: fetchEmployees,
  });
};
