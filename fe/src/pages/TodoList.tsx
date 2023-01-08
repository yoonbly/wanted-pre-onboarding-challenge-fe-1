import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Todocreate from "../todo/TodoCreate";
import { useNavigate } from "react-router-dom";
import { deleteTodo, getTodo } from "../api/todosApi";

interface TodoObject {
  content: string;
  createdAt: string;
  id: string;
  title: string;
  updatedAt: string;
}

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getTodo().then((data) => setTodos(data.data));
  }, [todos]);

  const onEditHandler = (id: string) => {
    setShowModal(true);
    setIsEdit(true);
    setId(id);
  };
  const onAddHandler = () => {
    setShowModal(true);
    setIsEdit(false);
  };

  return (
    <div>
      {showModal && (
        <Todocreate
          id={id}
          showModal={showModal}
          setShowModal={setShowModal}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate("/")}
          style={{ marginBottom: "10px" }}
        >
          홈으로 가기
        </Button>
        <Button variant="contained" onClick={onAddHandler}>
          할일 추가하기
        </Button>
      </div>
      <div style={{ marginTop: "10px" }}>
        {todos.map((item: TodoObject) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "400px",
              borderBottom: "1px solid gray",
            }}
          >
            <ul>
              <li
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {item.title}
              </li>
            </ul>
            <div>
              <Button onClick={() => onEditHandler(item.id)}>수정</Button>
              <Button onClick={() => deleteTodo(item.id)} color="error">
                삭제
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
