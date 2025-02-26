import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const authSlice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: false,
    userName: null,
    userId: -1,
    userToken,
    loading: false,
    error: null,
  },
  reducers: {
    updateSession: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.userName = action.payload.userName;
      state.userToken = action.payload.userToken;
      state.userId = action.payload.userId;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userName = null;
      state.userToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { updateSession, loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
