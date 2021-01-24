import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const name = "content";

export const initialState = {
  list: {
    pending: false,
    type: "",
    filter: {},
    sort: { name: "", dir: "" },
    data: [],
    error: null,
  },
  page: { pending: false, data: {}, error: null },
  taxonomy: { pending: false, data: [], error: null },
};

export const getPage = createAsyncThunk(
  `${name}/getPage`,
  async ({ type = "pages", slug = "" }, thunkAPI) => {
    return await context.getContentTypeByName({ type, slug, thunkAPI });
  }
);

export const getList = createAsyncThunk(
  `${name}/getList`,
  async (props, thunkAPI) => {
    console.log("getList");
    return await context.getAllByContentType({ thunkAPI });
  }
);

const pending = (key, state) => {
  return {
    ...state,
    [key]: { ...state[key], pending: true },
  };
};
const fulfilled = (key, state, action) => {
  return {
    ...state,
    [key]: { ...state[key], data: action.payload, pending: false },
  };
};
const rejected = (key, state, action) => {
  return {
    ...state,
    [key]: { ...state[key], error: action.error, pending: false },
  };
};

export const ContentModule = createSlice({
  name,
  initialState,
  reducers: {
    reset: () => initialState,
    clearPage: (state) => ({ ...state, page: initialState.page }),
    clearList: (state) => ({ ...state, list: initialState.list }),
    setListType: (state, action) => ({
      ...state,
      list: { ...state.list, type: action.payload },
    }),
    setListFilter: (state, action) => {
      const { filter: currentFilter = {} } = state.list;
      const filter = { ...currentFilter };

      const { name: filterName, value } = action.payload;
      // does name exist in filter
      if (filterName in filter) {
        // exists
        // does value exist in filter name list
        if (filter[filterName].includes(value)) {
          filter[filterName] = filter[filterName].filter(
            (item) => item !== value
          );
        } else {
          // else, add to filter name list
          filter[filterName] = [...filter[filterName], value];
        }
      } else {
        // else add name list with value to filter
        filter[filterName] = [value];
      }
      return { ...state, list: { ...state.list, filter } };
    },
    resetListFilter: (state) => ({
      ...state,
      list: { ...state.list, filter: {} },
    }),
    setListSort: (state, action) => {
      const { name = "", dir = "ASC" } = action.payload;
      return {
        ...state,
        list: { ...state.list, sort: { name, dir } },
      };
    },
    resetListSort: (state) => ({
      ...state,
      list: { ...state.list, sort: initialState.list.sort },
    }),
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

export const {
  reset,
  clearPage,
  clearList,
  setListType,
  setListFilter,
  resetListFilter,
  setListSort,
  resetListSort,
} = ContentModule.actions;

export default ContentModule.reducer;
