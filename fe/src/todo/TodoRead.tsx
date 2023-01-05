import { Button } from "@mui/material";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

type ResponseType = Record<string, any>;
interface TodoObject {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}
interface ModalType {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
}
const TodoRead = ({ setShowModal, setIsEdit }: ModalType) => {
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState("");
  const getTodo = async () => {
    const res: ResponseType = await axios.get("/todos", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return res.data;
  };
  useEffect(() => {
    getTodo().then((data) => setTodos(data.data));
  }, [todos]);
  const onEditHandler = (id: string) => {
    setShowModal(true);
    setIsEdit(true);
    setId(id);
  };
  return (
    <div>
      {todos.map((item: TodoObject) => (
        <div key={item.id}>
          <label htmlFor={`todo-${item.id}`}>
            <input type="checkbox" id={`todo-${item.id}`} />
            {item.title}
          </label>
          <Button onClick={() => onEditHandler(item.id)}>수정</Button>
          <Button>삭제</Button>
        </div>
      ))}
    </div>
  );
};

export default TodoRead;
