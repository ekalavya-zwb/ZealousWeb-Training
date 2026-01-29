import api from "./api.js";

const getUsers = async () => {
  const response = await api.get("/employees");
  return response.data;
};

const getUsersById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  return response.data;
};

export { getUsers, getUsersById };
