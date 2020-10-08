import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
  list: { pending: false, data: [], error: null },
  page: { pending: false, data: {}, error: null },
  taxonomy: { pending: false, data: [], error: null },
};

export const getPage = createAsyncThunk(
  "content/getPage",
  async ({ type = "page", name = "" }) =>
    await context.getContentTypeByName({ type, name })
);
export const getTaxonomy = createAsyncThunk(
  "content/getTaxonomy",
  async ({ type }) => await context.getTaxonomyByContentType({ type })
);

export const getList = createAsyncThunk(
  "content/getList",
  async ({ type }) => await context.getAllByContentType({ type })
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
    [getTaxonomy.pending]: (state) => pending("taxonomy", state),
    [getTaxonomy.fulfilled]: (state, action) =>
      fulfilled("taxonomy", state, action),
    [getTaxonomy.rejected]: (state, action) =>
      rejected("taxonomy", state, action),
  },
});

export const { reset, clearPage, clearList } = contentSlice.actions;

export const list = (state) => state.content.list;
export const page = (state) => state.content.page;
export const taxonomy = (state) => state.content.taxonomy;

export default contentSlice.reducer;
