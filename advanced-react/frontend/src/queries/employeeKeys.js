export const employeeKeys = {
  all: ["employees"],
  list: (filters) => ["employees", "list", filters],
  detail: (id) => ["employees", "detail", id],
};
