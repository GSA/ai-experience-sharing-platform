import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

const initialState = {
  isAuth: false,
  token: "",
  error: "",
  pending: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) => {
    const payload = await context.postAuthCredentials({
      username,
      password,
    });

    return payload;
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
      error: "",
      token: "",
      pending: true,
    }),
    [login.fulfilled]: (state, action) => {
      console.log(action);
      return {
        ...action.payload,
        pending: false,
        isAuth: Boolean(action.payload.token),
      };
    },
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

export const auth = (state) => state.auth;

export default authSlice.reducer;
