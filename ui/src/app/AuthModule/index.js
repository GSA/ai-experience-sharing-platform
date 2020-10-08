import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
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

const AuthModule = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [login.pending]: (state) => ({
      ...state,
      error: "",
      token: "",
      pending: true,
    }),
    [login.fulfilled]: (state, action) => {
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

export const { reset } = AuthModule.actions;

export default AuthModule.reducer;