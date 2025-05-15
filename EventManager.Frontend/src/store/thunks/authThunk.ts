import { createAsyncThunk } from '@reduxjs/toolkit';
import {LoginRequest, RegisterRequest, User} from '../../api/data-contracts';
import {authClient} from "../../api/apiConfig.ts";

interface LoginPayload {
    credentials: LoginRequest;
    rememberMe: boolean;
}

export const loginUser = createAsyncThunk<User | null, LoginPayload, { rejectValue: string }>(
    'auth/loginUser',
    async ({ credentials, rememberMe }, { rejectWithValue, dispatch }) => {
        try {
            await authClient.loginCreate({ rememberMe }, credentials);
            const userAction = await dispatch(checkAuthStatus());
            if (checkAuthStatus.fulfilled.match(userAction)) {
                return userAction.payload as User | null;
            } else {
                return rejectWithValue('Login succeeded but failed to verify session.');
            }
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'An unknown error occurred during login.';
            return rejectWithValue(message);
        }
    }
);

export const registerUser = createAsyncThunk<void, RegisterRequest, { rejectValue: string }>(
    'auth/registerUser',
    async (data, { rejectWithValue }) => {
        try {
            await authClient.registerCreate(data);
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'An unknown error occurred during registration.';
            return rejectWithValue(message);
        }
    }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await authClient.logoutCreate();
        } catch (error: any) {
            const message = error.response?.data?.message || error.message || 'An unknown error occurred during logout.';
            return rejectWithValue(message);
        }
    }
);

export const checkAuthStatus = createAsyncThunk<User | null, void, { rejectValue: string }>(
    'auth/checkAuthStatus',
    async (_, { rejectWithValue }) => {
        try {
            const response = await authClient.getAuthentication();
            if (response.ok) {
                const data = await response.json();
                return data as User;
            } else if (response.status === 401) {
                return null;
            } else {
                return rejectWithValue(`Failed to fetch user status: ${response.status}`);
            }
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to check auth status');
        }
    }
);
