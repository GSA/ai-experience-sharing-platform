import { configureStore } from "@reduxjs/toolkit";
import content from "./ContentModule";
import menu from "./MenuModule";
import settings from "./SettingsModule";

export default configureStore({
  reducer: {
    content,
    menu,
    settings,
  },
});
