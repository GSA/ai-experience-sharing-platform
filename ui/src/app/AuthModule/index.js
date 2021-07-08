import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import QS from "query-string";
import context from "./context";

export const name = "auth";

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
    usecases: true,
    'usecase-settings': true,
    'api-search-suggestions': true,
  },
};

export const login = createAsyncThunk(
  `${name}/login`,
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
  `${name}/logout`,
  async (props) => await context.endSession(props)
);

export const loginAdmin = createAsyncThunk(
  `${name}/loginAdmin`,
  async (props) => context.createAdminSession(props)
);

export const refreshToken = createAsyncThunk(
  `${name}/refreshToken`,
  async (props, thunkAPI) => context.refreshToken({ props, thunkAPI })
);

const AuthModule = createSlice({
  name,
  initialState,
  reducers: {
    reset: () => initialState,
    setRedirect: (state, action) => (state.redirect ? state : {
      ...state,
      redirect: action.payload,
    }),
    clearRedirect: (state) => ({
      ...state,
      redirect: "",
    }),
    setAuth: /* istanbul ignore next */ (state) => ({
      ...state,
      isAuth: true,
      isAdminAuth: true,
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
    [refreshToken.fulfilled]: (state, action) => {
      return {
        ...state,
        token: action.payload ? action.payload.token : state.token,
      };
    },
  },
});

export const { reset, setRedirect, clearRedirect } = AuthModule.actions;

export default AuthModule.reducer;
