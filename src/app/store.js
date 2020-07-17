import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./sessionStorage";
import auth from "app/authSlice";
import content from "app/contentSlice";
import counter from "features/counter/counterSlice";
import site from "app/siteSlice";

const storeKey = "AI_SESSION_STORE";

const preloadedState = loadState(storeKey);

const store = configureStore({
  preloadedState,
  reducer: {
    auth,
    content,
    counter,
    site,
  },
});

store.subscribe(() => {
  saveState(storeKey, store.getState());
});

export default store;
