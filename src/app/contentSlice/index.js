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

export const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: {
    [getPage.pending]: (state) => {
      return { ...state, page: { ...state.page, pending: true } };
    },
    [getPage.fulfilled]: (state, action) => {
      return {
        ...state,
        page: { pending: false, data: action.payload },
      };
    },
    [getList.pending]: (state) => {
      return { ...state, list: { ...state.page, pending: true } };
    },
    [getList.fulfilled]: (state, action) => {
      return {
        ...state,
        list: { pending: false, data: action.payload },
      };
    },
    [getTaxonomy.pending]: (state) => {
      return { ...state, taxonomy: { ...state.taxonomy, pending: true } };
    },
    [getTaxonomy.fulfilled]: (state, action) => {
      return {
        ...state,
        taxonomy: { pending: false, data: action.payload },
      };
    },
  },
});

export const list = (state) => state.content.list;
export const page = (state) => state.content.page;

export default contentSlice.reducer;
