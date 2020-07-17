import { configureStore } from "@reduxjs/toolkit";
import counter from "features/counter/counterSlice";
import content from "app/contentSlice";
import site from "app/siteSlice";

const storeKey = "AI_SESSION_STORE";

export const loadState = (key) => {
  try {
    const serializedState = sessionStorage.getItem(key);

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
};

export const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    sessionStorage.setItem(key, serializedState);
  } catch (error) {
    // Ignore write errors.
  }
};

const preloadedState = loadState(storeKey);

const store = configureStore({
  preloadedState,
  reducer: {
    counter,
    content,
    site,
  },
});

store.subscribe(() => {
  saveState(storeKey, store.getState());
});

export default store;
