import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

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
  async () => await context.getUsecaseSettings()
);

export const getUsecaseFilters = createAsyncThunk(
  `${name}/getUsecaseFilters`,
  async () => await context.getUsecaseFilters()
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
      return { ...state, keymaps: action.payload.usecaseFilterTitles };
    },
    [getUsecaseFilters.fulfilled]: (state, action) => {
      return { ...state, filters: action.payload.filters };
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
