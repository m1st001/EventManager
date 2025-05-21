import {createSlice} from '@reduxjs/toolkit';
import {User} from "../../api/data-contracts.ts";
import {fetchMe, loginUser, logout, registerUser} from "../thunks/authThunk.ts";

interface AuthState {
    user: User | null;
    isLoading: boolean;
    error: string | null;
}

const savedUser = localStorage.getItem('authUser');
const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
            .addCase(fetchMe.fulfilled, (state, action) => {
                state.user = action.payload;
            });
    },
});

export const authReducer = authSlice.reducer;

export default authSlice.reducer;
