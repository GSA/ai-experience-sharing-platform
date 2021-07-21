import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const name = "content";

const filterTypes = {
  boolean: ({ filter, filterName, value, operand, type }) => {
    const foundFilter = filter.find((item) => item.name === filterName);
    let rVal;
    if (foundFilter) {
      const filterList = filter.filter((item) => item.name !== filterName);
      rVal = [...filterList, { name: filterName, value, operand, type }];
    } else {
      rVal = [...filter, { name: filterName, value, operand, type }];
    }
    return rVal;
  },
  enumeration: ({ filter, filterName, value, operand, type, isVirtual }) => {
    const foundFilter = filter.find((item) => item.name === filterName);
    let rVal;
    if (foundFilter) {
      const filterList = filter.filter((item) => item.name !== filterName);
      const newValues = foundFilter.value.includes(value)
        ? foundFilter.value.filter((item) => item !== value)
        : [...foundFilter.value, value];
      rVal = [
        ...filterList,
        { name: filterName, value: newValues, operand, type, isVirtual },
      ];
    } else {
      rVal = [...filter, { name: filterName, value: [value], operand, type, isVirtual }];
    }
    return rVal;
  },
};

export const initialState = {
  list: {
    pending: false,
    type: "",
    filter: [],
    sort: { name: "publishedDate", dir: "ASC" },
    data: [],
    error: null,
    errorCount: 0,
  },
  page: { pending: false, data: {}, error: null },
  taxonomy: { pending: false, data: [], error: null },
  searchTerm: "",
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
    return await context.getAllByContentType({ thunkAPI, props });
  }
);

const pending = (key, state) => {
  return {
    ...state,
    [key]: { ...state[key], error: null, pending: true },
  };
};
const fulfilled = (key, state, action) => {
  return {
    ...state,
    [key]: { ...state[key], data: action.payload, error: null, pending: false },
  };
};
const rejected = (key, state, action) => {
  return {
    ...state,
    [key]: {
      ...state[key],
      data: action.payload,
      error: action.error,
      errorCount: state[key].errorCount + 1,
      pending: false,
    },
  };
};

export const ContentModule = createSlice({
  name,
  initialState,
  reducers: {
    reset: () => initialState,
    clearPage: (state) => ({ ...state, page: initialState.page }),
    clearList: (state) => ({ ...state, list: initialState.list }),
    setListDefaults: (state, { payload = {} }) => {
      return {
        ...state,
        list: { ...state.list, ...payload },
      };
    },
    setListFilter: (state, action) => {
      /* istanbul ignore next */
      const { filter: currentFilter = [] } = state.list;

      const { name: filterName, value, operand, type, isVirtual } = action.payload;
      // does name exist in filter
      /* istanbul ignore next */
      const filter =
        type in filterTypes
          ? filterTypes[type]({
              filter: currentFilter,
              filterName,
              value,
              operand,
              type,
              isVirtual,
            })
          : [...currentFilter];

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
 setSearchTerm: (state, action) => {
      return {
        ...state,
        searchTerm: action.payload,
      }
    },
  },
  extraReducers: {
    [getPage.pending]: (state) => pending("page", state),
    [getPage.fulfilled]: (state, action) => {
      if (!(action.payload.slug || '').toLowerCase().startsWith('usecase')) {
        state = {
          ...state,
          searchTerm: '',
        };
      }
      return fulfilled("page", state, action)
    },
    [getPage.rejected]: (state, action) =>
      rejected("page", state, { ...action, payload: {} }),
    [getList.pending]: (state) => pending("list", state),
    [getList.fulfilled]: (state, action) => fulfilled("list", state, action),
    [getList.rejected]: (state, action) =>
      rejected("list", state, { ...action, payload: [] }),
  },
});

export const {
  reset,
  clearPage,
  clearList,
  setListDefaults,
  setListFilter,
  resetListFilter,
  setListSort,
  resetListSort,
  setSearchTerm,
} = ContentModule.actions;

export default ContentModule.reducer;
