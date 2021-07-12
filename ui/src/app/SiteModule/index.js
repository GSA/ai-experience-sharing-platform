import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";
import { cms } from "utils/cms";

export const name = "site";

export const initialState = {
  author: "",
  title: "",
  description: "",
  menus: [],
  footer: [],
  searchgov: {
    endpoint: "",
    affiliate: "",
    access_key: "",
    inline: true,
  },
  keymaps: {},
  filters: {},
  sort: [],
  bokModules: [],
  dapAgency: "",
};

export const siteData = createAsyncThunk(
  `${name}/getSiteData`,
  async () => await context.getSiteData()
);

export const getMenus = createAsyncThunk(
  `${name}/getMenus`,
  async () => await context.getMenus()
);

export const getUsecaseSettings = createAsyncThunk(
  `${name}/getUsecaseSettings`,
  async (props, thunkAPI) => {
    const state = thunkAPI.getState();
    /* istanbul ignore next */
    if (state.auth && state.auth.pending) {
      new Promise((resolve, reject) => {
        setTimeout(reject, cms.authenticatedErrorDelay);
      });
    }
    return await context.getUsecaseSettings({ thunkAPI })
  },
);

export const getUsecaseFilters = createAsyncThunk(
  `${name}/getUsecaseFilters`,
  async (props, thunkAPI) => await context.getUsecaseFilters({ thunkAPI })
);

export const SiteModule = createSlice({
  name,
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [siteData.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getMenus.fulfilled]: (state, action) => {
      return { ...state, menus: action.payload };
    },
    [getUsecaseSettings.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getUsecaseFilters.fulfilled]: (state, action) => {
      return { ...state, filters: action.payload };
    },
  },
});

export const { reset } = SiteModule.actions;

export const menu = (menuName) => (state) => {
  const found = state.site.menus.find((item) => item.slug === menuName);
  return Boolean(found) ? found : { slug: menuName, items: [] };
};

export const siteMeta = ({ site: { title, author, description } }) => ({
  title,
  author,
  description,
});

export default SiteModule.reducer;
