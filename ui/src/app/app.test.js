import app from "./index.js";
import { initialState as auth } from "app/AuthModule";
import { initialState as content } from "app/ContentModule";
import { initialState as site } from "app/SiteModule";
import { initialState as ai } from "app/AIModule";

const combinedState = {
  auth,
  content,
  site,
  ai,
};

describe("app", () => {
  describe("initialState", () => {
    it("should load the initial state", async () => {
      const state = await app.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(combinedState));
    });
  });
});
