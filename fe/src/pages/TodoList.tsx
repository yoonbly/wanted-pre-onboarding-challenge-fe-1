import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Todocreate from "../components/TodoCreate";
import { useNavigate } from "react-router-dom";
import { deleteTodo, getTodo } from "../api/todosApi";
import { FormBox, TodoBox, TodoListBox } from "../styles/pageStyles";
import { useQuery, useMutation, useQueryClient } from "react-query";

export interface Todos {
  content: string;
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [todos, setTodos] = useState<Todos[]>([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const { data } = useQuery("todos", getTodo);
  const queryClient = useQueryClient();
  const deleteMutation = useMutation((id: string) => deleteTodo(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

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
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      {showModal && (
        <Todocreate
          id={id}
          isEdit={isEdit}
          todos={todos}
          showModal={showModal}
          setShowModal={setShowModal}
          setIsEdit={setIsEdit}
          setTodos={setTodos}
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
      <TodoListBox>
        {data?.data.data.map((item: Todos) => (
          <TodoBox key={item.id}>
            {item.title}
            <div>
              <Button onClick={() => onEditHandler(item.id)}>수정</Button>
              <Button onClick={() => onDeleteHandler(item.id)} color="error">
                삭제
              </Button>
            </div>
          </TodoBox>
        ))}
      </TodoListBox>
    </div>
  );
};

export default TodoList;
