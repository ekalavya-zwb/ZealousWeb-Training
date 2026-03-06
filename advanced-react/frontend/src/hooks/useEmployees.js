import useEmployeeStore from "../Zustand/store/employeeStore";
const useEmployees = () => {
  const employees = useEmployeeStore((s) => s.employees);
  const fetchEmployees = useEmployeeStore((s) => s.fetchEmployees);
  const createEmployee = useEmployeeStore((s) => s.createEmployee);
  const updateEmployee = useEmployeeStore((s) => s.updateEmployee);
  const deleteEmployee = useEmployeeStore((s) => s.deleteEmployee);
  const selectedEmployee = useEmployeeStore((s) => s.selectedEmployee);
  const filters = useEmployeeStore((s) => s.filters);
  const setFilter = useEmployeeStore((s) => s.setFilter);
  const clearFilters = useEmployeeStore((s) => s.clearFilters);
  const pagination = useEmployeeStore((s) => s.pagination);
  const setPage = useEmployeeStore((s) => s.setPage);
  const loading = useEmployeeStore((s) => s.loading);
  const error = useEmployeeStore((s) => s.error);

  return {
    employees,
    fetchEmployees,
    selectedEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    filters,
    setFilter,
    clearFilters,
    pagination,
    setPage,
    loading,
    error,
  };
};

export default useEmployees;
