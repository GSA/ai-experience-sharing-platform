import { configureStore } from "@reduxjs/toolkit";
import reducer, { initialState, reset, login, logout } from "./index";

const store = configureStore({ reducer });

describe("authSlice", () => {
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
      await store.dispatch(login({ username: "jarvis", password: "vision" }));
      const state = await store.getState();
      expect(state.isAuth).toBeTruthy();
    });
    it("should logout", async () => {
      await store.dispatch(logout());
      const state = await store.getState();
      expect(state.isAuth).toBeFalsy();
    });
  });
});
