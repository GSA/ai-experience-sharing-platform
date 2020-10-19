import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
  author: "",
  title: "",
  description: "",
  menus: [],
  searchgov: {
    endpoint: "",
    affiliate: "",
    access_key: "",
    inline: true,
  },
  dapAgency: "",
};

export const siteData = createAsyncThunk(
  "site/getSiteData",
  async () => await context.getSiteData()
);

export const getMenus = createAsyncThunk(
  "site/getMenus",
  async () => await context.getMenus()
);

export const SiteModule = createSlice({
  name: "site",
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
