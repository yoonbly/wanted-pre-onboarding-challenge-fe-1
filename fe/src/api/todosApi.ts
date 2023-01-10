import axios from "axios";

type ResponseType = Record<string, any>;
type DataType = Record<string, string>;

const getTodo = async () => {
  const res: ResponseType = await axios.get("/todos", {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const getTodoById = async (id: string) => {
  const res: ResponseType = await axios.get(`/todos/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  return res.data;
};

const deleteTodo = async (id: string) => {
  await axios.delete(`/todos/${id}`, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const createTodo = async (data: DataType) => {
  await axios.post("/todos", data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const updateTodo = async (data: DataType, id: string) => {
  await axios.put(`/todos/${id}`, data, {
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export { getTodo, getTodoById, deleteTodo, createTodo, updateTodo };
