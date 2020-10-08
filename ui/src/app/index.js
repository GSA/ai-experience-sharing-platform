import { configureStore } from "@reduxjs/toolkit";
import auth from "app/AuthModule";
import content from "app/ContentModule";
import site from "app/SiteModule";

const storeKey = "AI_SESSION_STORE";

const store = configureStore({
  reducer: {
    auth,
    content,
    site,
  },
});

export default store;
