import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./sessionStorage";
import auth, { name as authName } from "app/AuthModule";
import content, { getList, name as contentName } from "app/ContentModule";
import site, { name as siteName } from "app/SiteModule";
import listWatcher from "utils/listWatcher";
import watch from "redux-watch";

const storeKey = "AI_SESSION_STORE";

const preloadedState = loadState(storeKey);

const store = configureStore({
  preloadedState,
  reducer: {
    [authName]: auth,
    [contentName]: content,
    [siteName]: site,
  },
});

store.subscribe(() => {
  saveState(storeKey, store.getState());
});

listWatcher(store);

export default store;
