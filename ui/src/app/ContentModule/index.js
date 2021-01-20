import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const name = "content";

export const initialState = {
  list: { pending: false, filter: {}, data: [], error: null },
  page: { pending: false, data: {}, error: null },
  taxonomy: { pending: false, data: [], error: null },
};

export const getPage = createAsyncThunk(
  `${name}/getPage`,
  async ({ type = "pages", slug = "" }, thunkAPI) => {
    return await context.getContentTypeByName({ type, slug, thunkAPI });
  }
);
export const getTaxonomy = createAsyncThunk(
  `${name}/getTaxonomy`,
  async ({ type }, thunkAPI) => {
    return await context.getTaxonomyByContentType({ type, thunkAPI });
  }
);

export const getList = createAsyncThunk(
  `${name}/getList`,
  async ({ type, query }, thunkAPI) => {
    return await context.getAllByContentType({ type, query, thunkAPI });
  }
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

export const ContentModule = createSlice({
  name,
  initialState,
  reducers: {
    reset: () => initialState,
    clearPage: (state) => ({ ...state, page: initialState.page }),
    clearList: (state) => ({ ...state, list: initialState.list }),
    setListFilter: (state, action) => {
      const { filter: currentFilter = {} } = state.list;
      const filter = { ...currentFilter };
      const { name, value } = action.payload;
      // does name exist in filter
      if (filter[name]) {
        // exists
        // does value exist in filter name list
        if (filter[name].includes(value)) {
          filter[name] = filter[name].filter((item) => item !== value);
        } else {
          // else, add to filter name list
          filter[name] = [...filter[name], value];
        }
      } else {
        // else add name list with value to filter
        filter[name] = [value];
      }
      return { ...state, list: { ...state.list, filter } };
    },
    resetListFilter: (state) => ({
      ...state,
      list: { ...state.list, filter: {} },
    }),
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

export const {
  reset,
  clearPage,
  clearList,
  setListFilter,
} = ContentModule.actions;

export default ContentModule.reducer;
