import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import todosReducer from "./todoSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
