import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
  isAuth: false,
  token: "",
  error: null,
  pending: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }) =>
    await context.postAuthCredentials({
      username,
      password,
    })
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (state) => await context.endSession(state)
);

const AuthModule = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [login.pending]: (state) => ({
      ...initialState,
      pending: true,
    }),
    [login.fulfilled]: (state, action) => {
      const newState = {
        ...initialState,
        isAuth: Boolean(action.payload.token),
        token: action.payload.token,
      };
      return newState;
    },
    [login.rejected]: (state, action) => {
      return {
        ...initialState,
        error: action.error.message,
      };
    },
    [logout.pending]: (state) => ({
      ...initialState,
      pending: true,
    }),
    [logout.fulfilled]: (state, action) => ({
      ...initialState,
    }),
    [logout.rejected]: (state, action) => {
      return {
        ...initialState,
        error: action.error.message,
      };
    },
  },
});

export const { reset } = AuthModule.actions;

export default AuthModule.reducer;
