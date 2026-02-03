import api from "./api.js";

const getUsers = async () => {
  const response = await api.get("/employees");
  return response.data;
};

const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

const getEmployeesDept = async () => {
  const response = await api.get("/employeesDept");
  return response.data;
};

const getUsersById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

const getDepartmentsById = async (id) => {
  const response = await api.get(`/departments/${id}`);
  return response.data;
};

const createUser = async (data) => {
  const response = await api.post(`/employees`, data);
  return response.data;
};

const deleteUser = async (id) => {
  const response = await api.delete(`/employees/${id}`);
  return response.data;
};

const updateUser = async (id, data) => {
  const response = await api.put(`/employees/${id}`, data);
  return response.data;
};

export {
  getUsers,
  getUsersById,
  createUser,
  deleteUser,
  updateUser,
  getDepartments,
  getDepartmentsById,
  getEmployeesDept,
};
