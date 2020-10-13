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
      await store.dispatch(login({ username: "jarvis", password: "vision" }));
      const state = await store.getState();
      expect(state.isAuth).toBeTruthy();
    });
    it("should return error on invalid credentials", async () => {
      await store.dispatch(login({ username: "", password: "" }));
      const state = await store.getState();
      expect(state.error).toBe("Invalid Credentials.");
    });
    it("should logout", async () => {
      await store.dispatch(logout());
      const state = await store.getState();
      expect(state.isAuth).toBeFalsy();
    });

    it("should logout", async () => {
      await store.dispatch(logout("error"));
      const state = await store.getState();
      expect(state.error).toBe("Logout error.");
    });
  });
});
