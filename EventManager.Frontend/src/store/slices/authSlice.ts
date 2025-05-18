import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginUser, logoutUser, checkAuthStatus } from '../thunks/authThunk';
import {User} from "../../api/data-contracts.ts";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null | undefined;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(loginUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = action.payload as string || 'Login failed';
        })
        // Logout User
        .addCase(logoutUser.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = null;
        })
        .addCase(logoutUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.user = null;
          state.error = action.payload as string || 'Logout failed';
        })
        // Check Auth Status
        .addCase(checkAuthStatus.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(checkAuthStatus.fulfilled, (state, action: PayloadAction<User | null>) => {
          state.isLoading = false;
          state.isAuthenticated = !!action.payload;
          state.user = action.payload;
          state.error = null;
        })
        .addCase(checkAuthStatus.rejected, (state) => {
          state.isLoading = false;
          state.isAuthenticated = false;
          state.user = null;
        });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;