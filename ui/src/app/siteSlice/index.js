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

export const siteSlice = createSlice({
  name: "site",
  initialState,
  extraReducers: {
    [siteData.fulfilled]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [getMenus.fulfilled]: (state, action) => {
      return { ...state, menus: action.payload };
    },
  },
});

export const menu = (menuName) => (state) => {
  const found = state.site.menus.find(({ name }) => name === menuName);
  return Boolean(found) ? found : { name: menuName, items: [] };
};

export const siteMeta = ({ site: { title, author, description } = {} }) => ({
  title,
  author,
  description,
});

export default siteSlice.reducer;
