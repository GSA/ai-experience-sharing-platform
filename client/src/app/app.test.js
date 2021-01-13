import app from "./index.js";
import { initialState as content } from "app/ContentModule";
import { initialState as menu } from "app/MenuModule";
import { initialState as settings } from "app/SettingsModule";

const combinedState = {
  content,
  menu,
  settings,
};

describe("app", () => {
  describe("initialState", () => {
    it("should load the initial state", async () => {
      const state = await app.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(combinedState));
    });
  });
});
