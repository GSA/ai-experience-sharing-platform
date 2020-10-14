import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  reset,
  siteMeta,
  getMenus,
  menu,
  siteData,
} from "./index";

const store = configureStore({ reducer });

describe("SiteModule", () => {
  describe("initialState", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load the initial state", async () => {
      const state = await store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });

  describe("Menu Data", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load menus", async () => {
      await store.dispatch(getMenus());
      const state = await store.getState();
      expect(state.menus.length).toBe(3);
    });
    it("should return a menu", async () => {
      await store.dispatch(getMenus());
      const site = await store.getState();
      const data = menu("primary")({ site });
      expect(data.name).toBe("primary");
    });
    it("should return empty if no menu found", async () => {
      await store.dispatch(getMenus());
      const site = await store.getState();
      const data = menu("error")({ site });
      expect(data.items.length).toBe(0);
    });
  });

  describe("Site Data", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load siteMeta", async () => {
      await store.dispatch(siteData());
      const state = await store.getState();
      expect(state.title).toBe("test title");
    });
    it("should return siteMeta", async () => {
      const site = await store.getState();
      const data = siteMeta({ site });
      expect(data).toHaveProperty("title");
      expect(data).toHaveProperty("author");
      expect(data).toHaveProperty("description");
    });
  });
});
