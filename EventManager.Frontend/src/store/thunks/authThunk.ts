import { createAsyncThunk } from '@reduxjs/toolkit';
import {LoginRequest, RegisterRequest} from "../../api/data-contracts.ts";
import {authClient} from "../../api/apiConfig.ts";

export const loginUser = createAsyncThunk('auth/login', async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
        const response = await authClient.loginCreate({rememberMe: true}, credentials);
        localStorage.setItem('authUser', JSON.stringify(response.data));
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Login failed');
    }
});

export const registerUser = createAsyncThunk('auth/register', async (credentials: RegisterRequest, { rejectWithValue }) => {
    try {
        const response = await authClient.registerCreate(credentials);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Registration failed');
    }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
    try {
        await authClient.logoutCreate();
        localStorage.removeItem('authUser');
        return null;
    } catch (error: any) {
        return rejectWithValue('Logout failed');
    }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
    try {
        const response = await authClient.getAuthentication();
        return response.data;
    } catch (error: any) {
        return rejectWithValue('Fetch user data failed');
    }
});
