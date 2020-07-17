import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as context from "./context";

const initialState = {
  isAuth: false,
  token: "",
  pending: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const { token = "" } = await context.postAuthCredentials({
      username,
      password,
    });

    return token;
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => await context.endSession()
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [login.pending]: (state) => ({
      ...state,
      pending: true,
    }),
    [login.fulfilled]: (state, action) => ({
      ...state,
      pending: false,
      token: action.payload,
      isAuth: Boolean(action.payload),
    }),
    [logout.pending]: (state) => ({
      ...state,
      pending: true,
    }),
    [logout.fulfilled]: (state, action) => ({
      ...state,
      pending: false,
      token: "",
      isAuth: false,
    }),
  },
});

export const isAuth = (state) => state.auth.isAuth;

export default authSlice.reducer;
