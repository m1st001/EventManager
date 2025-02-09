import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    isLoggedIn: false,
    userId: -1,
    userName: "username",
  },
  reducers: {
    updateSession: (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
});

export const { updateSession } = sessionSlice.actions;
export default sessionSlice.reducer;
