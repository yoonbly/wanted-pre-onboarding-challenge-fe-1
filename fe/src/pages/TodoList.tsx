import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Todocreate from "../components/TodoCreate";
import { useNavigate } from "react-router-dom";
import { deleteTodo, getTodo } from "../api/todosApi";
import { FormBox, TodoBox } from "../styles/pageStyles";

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
  const onDeleteHandler = (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteTodo(id);
    }
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
      <FormBox>
        <Button variant="outlined" onClick={() => navigate("/")}>
          홈으로 가기
        </Button>
        <Button variant="contained" onClick={onAddHandler}>
          할일 추가하기
        </Button>
      </FormBox>
      <div style={{ marginTop: "10px" }}>
        {todos.map((item: TodoObject) => (
          <TodoBox key={item.id}>
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
              <Button onClick={() => onDeleteHandler(item.id)} color="error">
                삭제
              </Button>
            </div>
          </TodoBox>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
