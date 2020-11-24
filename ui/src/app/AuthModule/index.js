import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QS from "query-string";
import context from "./context";

export const initialState = {
  isAuth: false,
  isAdminAuth: false,
  token: "",
  adminToken: "",
  user: {
    id: "",
    username: "",
    email: "",
    provider: "",
    confirmed: null,
  },
  adminUser: {
    id: "",
    email: "",
  },
  error: null,
  pending: false,
  pendingAdmin: false,
  redirect: "",
  authenticatedTypes: {
    "usecases": true,
  },
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ provider, search }) => context.createSession({ provider, search })
);

export const loginUrl = (params) => {
  const rootUrl = `/connect/logingov`;
  const query = {};
  return `${rootUrl}?${QS.stringify(query)}`;
};

export const loginAdminUrl = () => {
  const rootUrl = `/admin/`;
  return `${rootUrl}`;
};

export const logout = createAsyncThunk(
  "auth/logout",
  async (props) => await context.endSession(props)
);

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (props) => context.createAdminSession(props)
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
    [loginAdmin.pending]: (state) => ({
      ...state,
      pendingAdmin: true,
    }),
    [loginAdmin.fulfilled]: (state, action) => {
      const newState = {
        ...state,
        adminToken: action.payload.token,
        adminUser: action.payload.user,
        isAdminAuth: Boolean(action.payload.token),
        pendingAdmin: false,
      };
      return newState;
    },
    [loginAdmin.rejected]: (state, action) => {
      return {
        ...state,
        error: action.error.message,
      };
    },

  },
});

export const { reset, setRedirect, clearRedirect } = AuthModule.actions;

export default AuthModule.reducer;
