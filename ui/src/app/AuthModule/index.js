import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QS from "query-string";
import context from "./context";

export const initialState = {
  isAuth: false,
  token: "",
  user: {
    id: "",
    username: "t",
    email: "",
    provider: "",
    confirmed: null,
  },
  error: null,
  pending: false,
  redirect: "",
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
    setRedirect: (state, action) => ({
      ...state,
      redirect: action.payload,
    }),
    clearRedirect: (state) => ({
      ...state,
      redirect: "",
    }),
  },
  extraReducers: {
    [login.pending]: (state) => ({
      ...initialState,
      redirect: state.redirect,
      pending: true,
    }),
    [login.fulfilled]: (state, action) => {
      const newState = {
        ...initialState,
        redirect: state.redirect,
        isAuth: Boolean(action.payload.jwt),
        token: action.payload.jwt,
        user: action.payload.user,
      };
      return newState;
    },
    [login.rejected]: (state, action) => {
      return {
        ...initialState,
        redirect: state.redirect,
        error: action.error.message,
      };
    },
    [logout.pending]: (state) => ({
      ...initialState,
      redirect: state.redirect,
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

export const { reset, setRedirect, clearRedirect } = AuthModule.actions;

export default AuthModule.reducer;
