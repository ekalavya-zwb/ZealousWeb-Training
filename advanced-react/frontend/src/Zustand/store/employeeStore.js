import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const useEmployeeStore = create(
  devtools(
    immer((set) => ({
      employees: [],
      selectedEmployee: null,

      filters: {
        search: "",
        department: "",
      },

      pagination: {
        page: 1,
        limit: 10,
        total: 0,
      },

      loading: false,
      error: null,

      fetchEmployees: async () => {
        try {
          set((state) => {
            state.loading = true;
            state.error = null;
          });

          const res = await fetch(`/api/employees`);

          if (!res.ok) {
            throw new Error("Failed to fetch employees");
          }

          const data = await res.json();

          set((state) => {
            state.employees = data;
            state.pagination.total = data.length;
            state.loading = false;
          });
        } catch (err) {
          set((state) => {
            state.error = err.message;
            state.loading = false;
          });
        }
      },

      createEmployee: async (employeeData) => {
        const tempId = Date.now();

        try {
          set((state) => {
            state.employees.unshift({
              id: tempId,
              ...employeeData,
            });
          });

          const res = await fetch("/api/employees", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
          });

          if (!res.ok) {
            throw new Error("Failed to create employee");
          }

          const data = await res.json();

          set((state) => {
            const index = state.employees.findIndex((e) => e.id === tempId);

            if (index !== -1) {
              state.employees[index] = data.employee;
            }
          });
        } catch (err) {
          set((state) => {
            state.error = err.message;
          });
        }
      },

      updateEmployee: async (id, updateData) => {
        try {
          const res = await fetch(`/api/employees/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          });

          if (!res.ok) {
            throw new Error("Failed to update employee");
          }

          const data = await res.json();

          set((state) => {
            const emp = state.employees.find((e) => e.id === id);
            if (emp) {
              Object.assign(emp, data.employee);
            }
          });
        } catch (err) {
          set((state) => {
            state.error = err.message;
          });
        }
      },

      deleteEmployee: async (id) => {
        try {
          const res = await fetch(`/api/employees/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            throw new Error("Failed to delete employee");
          }

          set((state) => {
            state.employees = state.employees.filter((e) => e.id !== id);
          });
        } catch (err) {
          set((state) => {
            state.error = err.message;
          });
        }
      },

      setSelectedEmployee: (id) => {
        set((state) => {
          state.selectedEmployee =
            state.employees.find((e) => e.id === id) || null;
        });
      },

      setFilter: (key, value) => {
        set((state) => {
          state.filters[key] = value;
          state.pagination.page = 1;
        });
      },

      setPage: (page) => {
        set((state) => {
          state.pagination.page = page;
        });
      },

      clearFilters: () => {
        set((state) => {
          state.filters = {
            search: "",
            department: "",
          };

          state.pagination.page = 1;
        });
      },
    })),
  ),
);

export default useEmployeeStore;
