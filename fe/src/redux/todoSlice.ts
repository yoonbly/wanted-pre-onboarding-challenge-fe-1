import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  isEdit: false,
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    editMode(state) {
      state.isEdit = true;
    },
    addMode(state) {
      state.isEdit = false;
    },
    setId(state, action) {
      state.id = action.payload;
    },
  },
});

export const { editMode, addMode, setId } = todoSlice.actions;
export default todoSlice.reducer;
