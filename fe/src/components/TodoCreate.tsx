import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { createTodo, getTodoById, updateTodo } from "../api/todosApi";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addMode } from "../redux/todoSlice";
import { Todo, TodoCreateType } from "../types/todoType";

const Todocreate = ({ showModal, setShowModal }: TodoCreateType) => {
  const [inputs, setInputs] = useState({
    title: "",
    content: "",
  });
  const { title, content } = inputs;
  const newTodo = { title, content };

  const isEdit = useAppSelector((state) => state.todos.isEdit);
  const id = useAppSelector((state) => state.todos.id);

  useQuery(["todo", id], () => getTodoById(id), {
    enabled: !!isEdit,
    onSuccess: (todo) =>
      setInputs({ title: todo.title, content: todo.content }),
  });

  const queryClient = useQueryClient();
  const addMutation = useMutation((newTodo: Todo) => createTodo(newTodo), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const editMutation = useMutation((newTodo: Todo) => updateTodo(newTodo, id), {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const onCreateHandler = async () => {
    addMutation.mutate(newTodo);
    setShowModal(false);
  };

  const onUpdateHandler = async () => {
    editMutation.mutate(newTodo);
    setShowModal(false);
  };

  return (
    <div>
      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          sx={style}
          noValidate
          autoComplete="off"
          onSubmit={isEdit ? onUpdateHandler : onCreateHandler}
        >
          <h2>{isEdit ? "할일 수정하기" : "할일 추가하기"}</h2>
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="제목"
                  variant="standard"
                  type="text"
                  name="title"
                  value={title}
                  fullWidth
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="내용"
                  multiline
                  rows={4}
                  type="text"
                  name="content"
                  value={content}
                  fullWidth
                  onChange={onChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              size="large"
            >
              {isEdit ? "수정" : "저장"}
            </Button>
            <Button
              type="button"
              fullWidth
              size="large"
              onClick={() => {
                setShowModal(false);
              }}
            >
              취소
            </Button>
          </FormControl>
        </Box>
      </Modal>
    </div>
  );
};

export default Todocreate;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "7px",
  boxShadow: 24,
  p: 4,
  "& > :not(style)": { m: 1 },
};
