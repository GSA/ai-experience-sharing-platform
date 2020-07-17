import { configureStore } from "@reduxjs/toolkit";
import counter from "features/counter/counterSlice";
import content from "app/contentSlice";
import site from "app/siteSlice";

export default configureStore({
  reducer: {
    counter,
    content,
    site,
  },
});
