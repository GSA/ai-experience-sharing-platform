import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const name = "content";

const filterTypes = {
  boolean: ({ filter = [], filterName, value, operand, type }) => {
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
  enumeration: ({ filter = [], filterName, value, operand, type }) => {
    const foundFilter = filter.find((item) => item.name === filterName);
    let rVal;
    if (foundFilter) {
      const filterList = filter.filter((item) => item.name !== filterName);
      const newValues = foundFilter.value.includes(value)
        ? foundFilter.value.filter((item) => item !== value)
        : [...foundFilter.value, value];
      rVal = [
        ...filterList,
        { name: filterName, value: newValues, operand, type },
      ];
    } else {
      rVal = [...filter, { name: filterName, value: [value], operand, type }];
    }
    return rVal;
  },
};

export const initialState = {
  list: {
    pending: false,
    type: "",
    filter: [],
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
    return await context.getAllByContentType({ thunkAPI });
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
      pending: false,
    },
  };
};
const fulfilledPage = (key, state, action) => {
  let payload;

  if ((action.payload || {}).liftHero) {
    const heroContent = (action.payload.content || []).filter(
      (c) =>
        c.__component === "content.markdown" &&
        (c.className || "").includes("usa-hero")
    );
    payload = {
      heroContent,
      ...action.payload,
      content: (action.payload.content || []).filter(
        (c) => c !== heroContent[0]
      ),
    };
  } else {
    payload = action.payload;
  }
  return {
    ...state,
    [key]: { ...initialState[key], data: payload },
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
      const { filter: currentFilter = [] } = state.list;

      const { name: filterName, value, operand, type } = action.payload;
      // does name exist in filter
      const filter =
        type in filterTypes
          ? filterTypes[type]({
              filter: currentFilter,
              filterName,
              value,
              operand,
              type,
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
  },
  extraReducers: {
    [getPage.pending]: (state) => pending("page", state),
    [getPage.fulfilled]: (state, action) =>
      fulfilledPage("page", state, action),
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
} = ContentModule.actions;

export default ContentModule.reducer;
