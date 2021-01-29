import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./sessionStorage";
import auth from "app/AuthModule";
import content from "app/ContentModule";
import site from "app/SiteModule";

const storeKey = "AI_SESSION_STORE";

const preloadedState = loadState(storeKey);

const store = configureStore({
  preloadedState,
  reducer: {
    auth,
    content,
    site,
  },
});

store.subscribe(() => {
  saveState(storeKey, store.getState());
});

export default store;
