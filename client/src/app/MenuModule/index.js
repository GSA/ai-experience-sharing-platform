import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const initialState = {
  pending: false,
  error: null,
  data: [],
};

export const getMenuList = createAsyncThunk(
  "menu/getMenuList",
  async (props = {}) => await context.getAllMenus(props)
);

export const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [getMenuList.pending]: (state) => ({ ...initialState, pending: true }),
    [getMenuList.fulfilled]: (state, action) => ({
      ...initialState,
      data: action.payload,
    }),
    [getMenuList.rejected]: (state, action) => ({
      ...initialState,
      error: action.error,
    }),
  },
});

export const { reset } = menuSlice.actions;

export default menuSlice.reducer;
