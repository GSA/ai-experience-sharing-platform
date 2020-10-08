import { configureStore } from "@reduxjs/toolkit";
import auth from "app/authSlice";
import content from "app/contentSlice";
import site from "app/siteSlice";

const storeKey = "AI_SESSION_STORE";

const store = configureStore({
  reducer: {
    auth,
    content,
    site,
  },
});

export default store;
