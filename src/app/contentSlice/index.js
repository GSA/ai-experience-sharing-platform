import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as context from "./context";

const initialState = {
  usecase: { pending: false, data: {} },
  usecaseList: { pending: false, data: [] },
  resource: { pending: false, data: [], active: {} },
  resourceList: { pending: false, data: {} },
  page: { pending: false, data: {} },
  taxonomies: { pending: false, data: [] },
};

export const getUsecase = createAsyncThunk(
  "content/getUsecase",
  async (slug) => await context.getContentTypeBySlug("usecase", slug)
);
export const getResource = createAsyncThunk(
  "content/getResource",
  async (slug) => await context.getContentTypeBySlug("resource", slug)
);
export const getPage = createAsyncThunk(
  "content/getPage",
  async (slug) => await context.getContentTypeBySlug("page", slug)
);
export const getAllTaxonomy = createAsyncThunk(
  "content/getTaxonomy",
  async () => await context.getAllTaxonomy()
);

export const getAllUsecase = createAsyncThunk(
  "content/getAllUsecase",
  async () => await context.getAllByContentType("usecase")
);

export const getAllResource = createAsyncThunk(
  "content/getAllResource",
  async () => await context.getAllByContentType("resource")
);

export const getAllPage = createAsyncThunk(
  "content/getAllPage",
  async () => await context.getAllByContentType("page")
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  extraReducers: {
    [getUsecase.pending]: (state) => {
      return { ...state, usecase: { ...state.usecase, pending: true } };
    },
    [getUsecase.fulfilled]: (state, action) => {
      return {
        ...state,
        usecase: { pending: false, data: action.payload },
      };
    },
    [getResource.pending]: (state) => {
      return { ...state, resource: { ...state.resource, pending: true } };
    },
    [getResource.fulfilled]: (state, action) => {
      return {
        ...state,
        resource: { pending: false, data: action.payload },
      };
    },
    [getPage.pending]: (state) => {
      return { ...state, page: { ...state.page, pending: true } };
    },
    [getPage.fulfilled]: (state, action) => {
      return {
        ...state,
        page: { pending: false, data: action.payload },
      };
    },
    [getAllUsecase.pending]: (state) => {
      return { ...state, usecaseList: { ...state.usecase, pending: true } };
    },
    [getAllUsecase.fulfilled]: (state, action) => {
      return {
        ...state,
        usecaseList: { pending: false, data: action.payload },
      };
    },
    [getAllResource.pending]: (state) => {
      return {
        ...state,
        resourceList: { ...state.resource, pending: true },
      };
    },
    [getAllResource.fulfilled]: (state, action) => {
      return {
        ...state,
        resourceList: { pending: false, data: action.payload },
      };
    },
    [getAllPage.pending]: (state) => {
      return { ...state, pageList: { ...state.page, pending: true } };
    },
    [getAllPage.fulfilled]: (state, action) => {
      return {
        ...state,
        pageList: { pending: false, data: action.payload },
      };
    },
    [getAllTaxonomy.pending]: (state) => {
      return { ...state, taxonomy: { ...state.taxonomy, pending: true } };
    },
    [getAllTaxonomy.fulfilled]: (state, action) => {
      return {
        ...state,
        taxonomy: { pending: false, data: action.payload },
      };
    },
  },
});

export const pageList = (state) => state.content.page.data;
export const usecaseList = (state) => state.content.usecase.data;
export const resourceList = (state) => state.content.resource.data;
export const page = (state) => state.content.page.data;
export const usecase = (state) => state.content.usecase.data;
export const resource = (state) => state.content.resource.data;

export default contentSlice.reducer;
