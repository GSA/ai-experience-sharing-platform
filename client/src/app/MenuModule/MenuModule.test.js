import { configureStore } from "@reduxjs/toolkit";
import reducer, { initialState, getMenuList, reset } from "app/MenuModule";

const store = configureStore({ reducer });

describe("MenuModule", () => {
  describe("initialState", () => {
    it("should load the initial state", async () => {
      const state = await store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });
  describe(".getMenuList", () => {
    beforeEach(async () => store.dispatch(reset()));
    it("should load a list of content", async () => {
      await store.dispatch(getMenuList());
      const state = store.getState();
      expect(state.data.length).toBe(1);
    });
    it("should load an error", async () => {
      await store.dispatch(getMenuList({ error: true }));
      const state = store.getState();
      expect(state.error.message).toBe("Invalid Props.");
    });
  });
});
