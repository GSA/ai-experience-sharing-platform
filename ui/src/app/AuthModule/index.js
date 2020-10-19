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
  const rootUrl = process.env.REACT_APP_AUTH_ROOT_URL;
  const query = {
    acr_values: "http://idmanagement.gov/ns/assurance/ial/1",
    client_id: "urn:gov:gsa:openidconnect.profiles:sp:sso:gsa:ai_experience",
    nonc:
      "66A27845-DB89-4433-9AA3-B4B21257FAE9FD69096A-22B2-4B3F-8EE6-0E85B5E00307",
    prompt: "select_account",
    redirect_uri:
      "https://strapi-api-host-main.app.cloud.gov/connect/logingov/callback",
    response_type: "code",
    scope: "openid+email",
    state:
      "abcdefghijklmnopabcdefghijklmnopFD69096A-22B2-4B3F-8EE6-0E85B5E00307",
    ...params,
  };
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
