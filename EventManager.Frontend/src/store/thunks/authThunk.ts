import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice.ts";
import { Authentication } from "../../api/Authentication.ts";
import { LoginRequest } from "../../api/data-contracts.ts";

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginRequest, { dispatch }) => {
    dispatch(loginStart());
    try {
      const auth = new Authentication();
      auth.baseUrl = import.meta.env.VITE_API_URL;

      const response = await auth.loginCreate(
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
