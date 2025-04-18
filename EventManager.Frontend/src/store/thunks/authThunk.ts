import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginFailure, loginStart, loginSuccess } from "../slices/authSlice.ts";
import { LoginRequest, RegisterRequest } from "../../api/data-contracts.ts";
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
    } catch (error: unknown) {
          if(error instanceof Error) {
              dispatch(loginFailure(error.message));
          }
      return false;
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (credentials: RegisterRequest, { dispatch }) => {
    dispatch(loginStart());
      try {
      const response = await authClient.registerCreate({
        username: credentials.username,
        email: credentials.email,
        password: credentials.password,
      });

      // After successful registration, log the user in
      if (response) {
        const loginResponse = await authClient.loginCreate(
          { rememberMe: false },
          {
            username: credentials.username,
            password: credentials.password,
          },
        );
        dispatch(loginSuccess(loginResponse.data));
        return true;
      }
      return false;
    } catch (error: unknown) {
          if (error instanceof Error) {
              dispatch(loginFailure(error.message));
          }
      return false;
    }
  },
);
