import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  email: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAccout(state, action) {
      state.isLogin = true;
      state.email = action.payload.email;
    },
    logoutAccout(state) {
      state.isLogin = false;
      state.email = null;
    },
  },
});

export const { loginAccout, logoutAccout } = userSlice.actions;
export default userSlice.reducer;
