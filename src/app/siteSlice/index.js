import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as context from "./context";

const initialState = {
  author: "",
  title: "",
  description: "",
  navigation: [],
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

export const siteSlice = createSlice({
  name: "site",
  initialState,
  extraReducers: {
    [siteData.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const primaryNav = (state) =>
  state.site.navigation.find(({ name }) => name === "primary");
export const secondaryNav = (state) =>
  state.site.navigation.find(({ name }) => name === "secondary");
export const footerNav = (state) =>
  state.site.navigation.find(({ name }) => name === "footer");
export const siteMeta = ({ site: { title, author, description } = {} }) => ({
  title,
  author,
  description,
});

export default siteSlice.reducer;
