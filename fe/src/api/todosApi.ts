import axios from "axios";

type DataType = Record<string, string>;

const getTodo = async () => {
  return await axios.get("/todos", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const getTodoById = async (id: string) => {
  return await axios.get(`/todos/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const deleteTodo = async (id: string) => {
  await axios.delete(`/todos/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const createTodo = async (data: DataType) => {
  return await axios.post("/todos", data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const updateTodo = async (data: DataType, id: string) => {
  return await axios.put(`/todos/${id}`, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export { getTodo, getTodoById, deleteTodo, createTodo, updateTodo };
