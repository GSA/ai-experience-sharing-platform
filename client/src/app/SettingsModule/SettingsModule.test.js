import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  getSettings,
  reset,
  getFooterList,
} from "app/SettingsModule";

const store = configureStore({ reducer });

describe("SettingsModule", () => {
  describe("initialState", () => {
    it("should load the initial state", async () => {
      const state = store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });
  describe(".getSettingsList", () => {
    beforeEach(async () => store.dispatch(reset()));
    it("should load settings", async () => {
      await store.dispatch(getSettings());
      const state = store.getState();
      expect(state.title).toBeTruthy();
    });
    it("should load an error", async () => {
      await store.dispatch(getSettings({ error: true }));
      const state = store.getState();
      expect(state.error.message).toBe("Invalid Props.");
    });
  });

  describe(".getFooterList", () => {
    beforeEach(async () => store.dispatch(reset()));
    it("should load Footer", async () => {
      await store.dispatch(getFooterList());
      const state = store.getState();
      expect(state.footers.length).toBe(2);
    });
    it("should load an error", async () => {
      await store.dispatch(getFooterList({ error: true }));
      const state = store.getState();
      expect(state.error.message).toBe("Invalid Props.");
    });
  });
});
