import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
  pending: false,
  error: null,
  404: [],
  footers: [],
  title: "",
  description: "",
  customFields: [],
};

export const getSettings = createAsyncThunk(
  "settings/getSettings",
  async (props = {}) => await context.getSettings(props)
);

export const getFooterList = createAsyncThunk(
  "settings/getFooterList",
  async (props = {}) => await context.getFooter(props)
);

export const slice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getSettings.pending]: (state) => ({ ...initialState, pending: true }),
    [getSettings.fulfilled]: (state, action) => ({
      ...state,
      ...action.payload,
      pending: false,
    }),
    [getSettings.rejected]: (state, action) => ({
      ...state,
      error: action.error,
      pending: false,
    }),
    [getFooterList.pending]: (state) => ({ ...initialState, pending: true }),
    [getFooterList.fulfilled]: (state, action) => ({
      ...state,
      footers: action.payload,
      pending: false,
    }),
    [getFooterList.rejected]: (state, action) => ({
      ...state,
      error: action.error,
    }),
    pending: false,
  },
});

export const { reset } = slice.actions;

export default slice.reducer;
