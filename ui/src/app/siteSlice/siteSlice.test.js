import { configureStore } from "@reduxjs/toolkit";
import reducer, { initialState, reset } from "./index";

const store = configureStore({ reducer });

describe("siteSlice", () => {
  describe("initialState", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load the initial state", async () => {
      const state = await store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });
});
