import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: localStorage.getItem("token") ? true : false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAccout(state) {
      state.isLogin = true;
    },
    logoutAccout(state) {
      state.isLogin = false;
    },
  },
});

export const { loginAccout, logoutAccout } = userSlice.actions;
export default userSlice.reducer;
