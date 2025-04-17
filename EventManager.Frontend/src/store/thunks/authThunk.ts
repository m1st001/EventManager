import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice.ts";
import { LoginRequest } from "../../api/data-contracts.ts";
import { authClient } from "../../api/apiConfig.ts";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { dispatch }) => {
    dispatch(loginStart());
    try {
      const response = await authClient.loginCreate(
        { rememberMe: false },
        {
          username: credentials.username,
          password: credentials.password,
        },
      );
      dispatch(loginSuccess(response.data));
      return true;
    } catch (error: any) {
      dispatch(loginFailure(error.message));
      return false;
    }
  },
);
