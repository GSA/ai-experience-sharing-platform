import { configureStore } from "@reduxjs/toolkit";
import reducer, { initialState, reset, login, logout } from "./index";

const store = configureStore({ reducer });

describe("AuthModule", () => {
  describe("initialState", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load the initial state", async () => {
      const state = await store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });

  describe("login/logout", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should login", async () => {
      await store.dispatch(login({ provider: "test" }));
      const state = await store.getState();
      expect(state.isAuth).toBeTruthy();
    });

    it("return error if invalid provider", async () => {
      await store.dispatch(login({ provider: "error" }));
      const state = await store.getState();
      expect(state.error).toBe("Invalid Provider.");
    });
    it("should logout", async () => {
      await store.dispatch(logout());
      const state = await store.getState();
      expect(state.isAuth).toBeFalsy();
    });

    it("should return logout error", async () => {
      await store.dispatch(logout("error"));
      const state = await store.getState();
      expect(state.error).toBe("Logout error.");
    });
  });
});
