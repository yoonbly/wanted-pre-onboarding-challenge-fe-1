import axios from "axios";

type DataType = Record<string, string>;

const userToken = localStorage.getItem("token");
const userHeaders = {
  headers: {
    authorization: `Bearer ${userToken}`,
  },
};

const getTodo = async () => {
  const res = await axios.get("/todos", userHeaders);
  return res.data.data;
};

const getTodoById = async (id: string) => {
  const res = await axios.get(`/todos/${id}`, userHeaders);
  return res.data.data;
};

const deleteTodo = async (id: string) => {
  await axios.delete(`/todos/${id}`, userHeaders);
};

const createTodo = async (data: DataType) => {
  return await axios.post("/todos", data, userHeaders);
};

const updateTodo = async (data: DataType, id: string) => {
  return await axios.put(`/todos/${id}`, data, userHeaders);
};

export { getTodo, getTodoById, deleteTodo, createTodo, updateTodo };
