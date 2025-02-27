import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice.ts";

const store = configureStore({
  reducer: {
    session: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
