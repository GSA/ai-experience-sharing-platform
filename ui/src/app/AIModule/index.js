import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import context from "./context";

export const name = "ai";

export const initialState = {
  bokList: {
    pending: false,
    data: [],
    error: null,
    errorCount: 0,
  },

};

export const getBokList = createAsyncThunk(
  `${name}/getBokList`,
  async () => {
    return await context.getBokList();
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

export const AIModule = createSlice({
  name,
  initialState,
  reducers: {
    reset: () => initialState,
    clearBokList: (state) => ({ ...state, bokList: initialState.bokList }),
  },
  extraReducers: {
    [getBokList.pending]: (state) => pending("bokList", state),
    [getBokList.fulfilled]: (state, action) => fulfilled("bokList", state, action),
    [getBokList.rejected]: (state, action) => rejected("bokList", state, { ...action, payload: {} }),
  },
});

export const {
  reset,
  clearBokList,
} = AIModule.actions;

export default AIModule.reducer;
