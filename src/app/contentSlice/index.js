import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as context from "./context";

const initialState = {
  list: { pending: false, data: [] },
  page: { pending: false, data: {} },
  taxonomies: { pending: false, data: [] },
};

export const getPage = createAsyncThunk(
  "content/getPage",
  async ({ type = "page", name = "" }) =>
    await context.getContentTypeByName(type, name)
);
export const getTaxonomy = createAsyncThunk(
  "content/getTaxonomy",
  async () => await context.getAllTaxonomy()
);

export const getList = createAsyncThunk(
  "content/getList",
  async (type) => await context.getAllByContentType(type)
);

const pending = (key, state, action) => ({
  ...state,
  [key]: { ...state[key], pending: true },
});
const fulfilled = (key, state, action) => ({
  ...state,
  [key]: { pending: false, data: action.payload },
});

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    clearPage: (state) => ({ ...state, page: initialState.page }),
    clearList: (state) => ({ ...state, list: initialState.list }),
  },
  extraReducers: {
    [getPage.pending]: (state) => pending("page", state),
    [getPage.fulfilled]: (state, action) => fulfilled("page", state, action),
    [getList.pending]: (state) => pending("list", state),
    [getList.fulfilled]: (state, action) => fulfilled("list", state, action),
    [getTaxonomy.pending]: (state) => pending("taxonomy", state),
    [getTaxonomy.fulfilled]: (state, action) =>
      fulfilled("taxonomy", state, action),
  },
});

export const clearPage = contentSlice.actions.clearPage;
export const clearList = contentSlice.actions.clearList;

export const list = (state) => state.content.list;
export const page = (state) => state.content.page;

export default contentSlice.reducer;
