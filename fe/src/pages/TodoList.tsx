import { Button } from "@mui/material";
import React, { useState } from "react";
import Todocreate from "../components/TodoCreate";
import { useNavigate } from "react-router-dom";
import { deleteTodo, getTodo } from "../api/todosApi";
import { FormBox, TodoBox, TodoListBox } from "../styles/pageStyles";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Todos } from "../types/todoType";
import { useAppDispatch } from "../redux/hooks";
import { addMode, editMode, setId } from "../redux/todoSlice";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const { data: todos } = useQuery("todos", () => getTodo());

  const { mutate: deleteMutation } = useMutation(
    (id: string) => deleteTodo(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
      },
    }
  );

  const onEditHandler = (id: string) => {
    setShowModal(true);
    dispatch(editMode());
    dispatch(setId(id));
  };

  const onAddHandler = () => {
    setShowModal(true);
    dispatch(addMode());
  };

  const onDeleteHandler = (id: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      deleteMutation(id);
    }
  };

  return (
    <div>
      {showModal && (
        <Todocreate showModal={showModal} setShowModal={setShowModal} />
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
        {todos &&
          todos.map((item: Todos) => (
            <TodoBox key={item.id}>
              {item.title}
              <div>
                <Button type="button" onClick={() => onEditHandler(item.id)}>
                  수정
                </Button>
                <Button
                  type="button"
                  onClick={() => onDeleteHandler(item.id)}
                  color="error"
                >
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
