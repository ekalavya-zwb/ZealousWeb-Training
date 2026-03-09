export const fetchEmployees = async () => {
  const res = await fetch("/api/employees");

  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }

  return res.json();
};

export const createEmployee = async (employeeData) => {
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

  return res.json();
};

export const updateEmployee = async ({ id, data }) => {
  const res = await fetch(`/api/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update employee");
  }

  return res.json();
};

export const deleteEmployee = async (id) => {
  const res = await fetch(`/api/employees/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete employee");
  }

  return res.json();
};
