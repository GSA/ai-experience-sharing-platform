import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const name = "content";

export const initialState = {
  list: { pending: false, data: [], error: null },
  page: { pending: false, data: {}, error: null },
  taxonomy: { pending: false, data: [], error: null },
};

const getToken = (type, state) => {
  const sendToken = state?.auth?.authenticatedTypes
    ? state.auth.authenticatedTypes[type]
    : false;
  return sendToken ? state.auth.token : null;
};

export const getPage = createAsyncThunk(
  `${name}/getPage`,
  async ({ type = "pages", slug = "", liftHero = false }, thunkAPI) => {
    const token = getToken(type, thunkAPI.getState());

    return await context.getContentTypeByName({ type, slug, token, liftHero });
  }
);
export const getTaxonomy = createAsyncThunk(
  `${name}/getTaxonomy`,
  async ({ type }, thunkAPI) => {
    const token = getToken(type, thunkAPI.getState());

    return await context.getTaxonomyByContentType({ type, token });
  }
);

export const getList = createAsyncThunk(
  `${name}/getList`,
  async ({ type, query }, thunkAPI) => {
    const token = getToken(type, thunkAPI.getState());

    return await context.getAllByContentType({ type, query, token });
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
const fulfilledPage = (key, state, action) => {
  let payload;

  if((action.payload || {}).liftHero) {
    const heroContent = (action.payload.content || []).filter(c => c.__component === "content.markdown" && (c.className || '').includes('usa-hero'));
    payload = {
      heroContent,
      ...action.payload,
      content: (action.payload.content || []).filter(c => c !== heroContent[0]),
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
  },
  extraReducers: {
    [getPage.pending]: (state) => pending("page", state),
    [getPage.fulfilled]: (state, action) => fulfilledPage("page", state, action),
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

export const { reset, clearPage, clearList } = ContentModule.actions;

export default ContentModule.reducer;
