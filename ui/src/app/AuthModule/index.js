import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QS from "query-string";
import context from "./context";

export const initialState = {
  isAuth: false,
  token: "",
  error: null,
  pending: false,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ provider, search }) => context.createSession({ provider, search })
);

export const loginUrl = (params) => {
  const rootUrl = `${process.env.REACT_APP_API_URL}/connect/logingov`;
  const query = {};
  return `${rootUrl}?${QS.stringify(query)}`;
};

export const logout = createAsyncThunk(
  "auth/logout",
  async (props) => await context.endSession(props)
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
        isAuth: Boolean(action.payload.jwt),
        token: action.payload.jwt,
      };
      return newState;
    },
    [logout.rejected]: (state, action) => {
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
