import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
  list: { pending: false, data: [], error: null },
  page: { pending: false, data: {}, error: null },
};

export const getPage = createAsyncThunk(
  "content/getPage",
  async ({ type = "page", name = "" }) =>
    await context.getContentTypeByName({ type, name })
);

export const getList = createAsyncThunk(
  "content/getList",
  async ({ type }) => await context.getAllByContentType({ type })
);

export const getAllContent = createAsyncThunk(
  "content/getList",
  async ({ types }) =>
    types.reduce(async (acc, type) => {
      const typeData = await context.getAllByContentType({ type });
      return { ...acc, [type]: typeData };
    }, {})
);

const pending = (key, state) => {
  return {
    ...state,
    [key]: { ...initialState[key], pending: true },
  };
};
const fulfilled = (key, state, action) => {
  return {
    ...state,
    [key]: { ...initialState[key], data: action.payload },
  };
};
const rejected = (key, state, action) => {
  return {
    ...state,
    [key]: { ...initialState[key], error: action.error },
  };
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getPage.pending]: (state) => pending("page", state),
    [getPage.fulfilled]: (state, action) => fulfilled("page", state, action),
    [getPage.rejected]: (state, action) => rejected("page", state, action),
    [getList.pending]: (state) => pending("list", state),
    [getList.fulfilled]: (state, action) => fulfilled("list", state, action),
    [getList.rejected]: (state, action) => rejected("list", state, action),
  },
});

export const { reset } = contentSlice.actions;

export default contentSlice.reducer;
