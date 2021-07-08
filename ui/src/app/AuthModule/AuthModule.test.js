import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  reset,
  login,
  logout,
  setRedirect,
  clearRedirect,
  loginAdminUrl,
  refreshToken,
  loginAdmin,
} from "./index";

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

    it("should set redirect", async () => {
      await store.dispatch(setRedirect("/test"));
      const state = await store.getState();
      expect(state.redirect).toBe("/test");
    });

    it("should set redirect", async () => {
      await store.dispatch(clearRedirect("/test"));
      const state = await store.getState();
      expect(state.redirect).toBe("");
    });
  });

  it("should return the admin UI url", () => {
    const url = loginAdminUrl();
    expect(url).toBe("/admin/");
  });

  it("should refresh auth tokens", async () => {
    await store.dispatch(refreshToken());
    const state = await store.getState();
    expect(state.token).toBeTruthy();
  });

  it("should not refresh empty auth tokens", async () => {
    await store.dispatch(refreshToken('error'));
    const state = await store.getState();
    expect(state.token).toBeTruthy();
  });

  it("should allow admin users to login", async () => {
    await store.dispatch(loginAdmin());
    const state = await store.getState();
    expect(state.adminToken).toBeTruthy();
  });

  it("should error when there is an issue with admin users to login", async () => {
    await store.dispatch(loginAdmin('error'));
    const state = await store.getState();
    expect(state.error).toBe('Admin error.')
  });

});
