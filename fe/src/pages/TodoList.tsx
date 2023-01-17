import { Button } from "@mui/material";
import React, { useState } from "react";
import Todocreate from "../components/TodoCreate";
import { deleteTodo, getTodo } from "../api/todosApi";
import styled from "@emotion/styled";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { Todos } from "../types/todoType";
import { useAppDispatch } from "../redux/hooks";
import { addMode, editMode, setId } from "../redux/todoSlice";

const TodoList = () => {
  const [showModal, setShowModal] = useState(false);

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
    <TodoContainer>
      {showModal && (
        <Todocreate showModal={showModal} setShowModal={setShowModal} />
      )}
      <Button variant="contained" size="large" onClick={onAddHandler}>
        할일 추가하기
      </Button>
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
    </TodoContainer>
  );
};

export default TodoList;

const TodoContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const TodoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  border-bottom: 1px solid gray;
  padding: 10px;
  margin-top: 10px;
`;
