import {
  Box,
  Button,
  FormControl,
  Grid,
  Modal,
  TextField,
} from "@mui/material";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { createTodo, getTodoById, updateTodo } from "../api/todosApi";

interface ModalType {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  id: string;
}

const Todocreate = ({
  id,
  isEdit,
  showModal,
  setShowModal,
  setIsEdit,
}: ModalType) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const data = {
    title,
    content,
  };
  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };
  const onCreateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      createTodo(data);
      setTitle("");
      setContent("");
      setIsEdit(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  const onUpdateHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      updateTodo(data, id);
      setTitle("");
      setContent("");
      setIsEdit(false);
      setShowModal(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getTodoById(id).then((data) => {
      if (isEdit) {
        setTitle(data.data.title);
        setContent(data.data.content);
      }
    });
  }, [id]);
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
          <FormControl component="fieldset" variant="standard">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="standard-basic"
                  label="제목"
                  variant="standard"
                  type="text"
                  value={title}
                  fullWidth
                  onChange={onChangeTitle}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  label="내용"
                  multiline
                  rows={4}
                  type="text"
                  value={content}
                  fullWidth
                  onChange={onChangeContent}
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
                setIsEdit(false);
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
