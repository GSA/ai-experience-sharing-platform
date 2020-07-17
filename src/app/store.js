import { configureStore } from "@reduxjs/toolkit";
import counter from "features/counter/counterSlice";
import content from "app/contentSlice";

export default configureStore({
  reducer: {
    counter,
    content,
  },
});
