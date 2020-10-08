import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  getPage,
  getList,
  getTaxonomy,
  reset,
  clearPage,
  clearList,
} from "./index";

const store = configureStore({ reducer });

describe("contentSlice", () => {
  describe("initialState", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load the initial state", async () => {
      const state = await store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });

  describe(".getList", () => {
    beforeEach(async () => await store.dispatch(reset()));
    it("should load a list of content", async () => {
      await store.dispatch(getList({ type: "test" }));
      const state = await store.getState();
      expect(state.list.data.length).toBe(2);
    });
    it("should load an error", async () => {
      await store.dispatch(getList({ type: "error" }));
      const state = await store.getState();
      expect(state.list.error.message).toBe("Invalid Type.");
    });
  });

  describe(".getPage", () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should load a page's content", async () => {
      await store.dispatch(getPage({ name: "test" }));
      const state = await store.getState();
      expect(state.page.data).toBeTruthy();
    });
    it("should load an error when incorrect type is passed", async () => {
      await store.dispatch(getPage({ type: "error", name: "test" }));
      const data = await store.getState();
      expect(data.page.error.message).toBe("Invalid Type.");
    });
    it("should load an error when no name is passed", async () => {
      await store.dispatch(getPage({ name: "" }));
      const data = await store.getState();
      expect(data.page.error.message).toBe("Invalid Name.");
    });
    it("should load an error when no props are passed", async () => {
      await store.dispatch(getPage({}));
      const data = await store.getState();
      expect(data.page.error.message).toBe("Invalid Name.");
    });
  });

  describe(".getTaxonomy", () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should load a taxonomy list", async () => {
      await store.dispatch(getTaxonomy({ type: "test" }));
      const data = await store.getState();
      expect(data.taxonomy.data.length).toBe(1);
    });
    it("should load an error when no type is passed", async () => {
      await store.dispatch(getTaxonomy({ type: "error" }));
      const data = await store.getState();
      expect(data.taxonomy.error.message).toBe("Invalid Type.");
    });
  });

  describe("utilities", () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should clear page", async () => {
      await store.dispatch(clearPage());
      const data = await store.getState();
      expect(data.page.data.title).toBeFalsy();
    });
    it("should clear list", async () => {
      await store.dispatch(getList({ type: "page" }));
      await store.dispatch(clearList());
      const data = await store.getState();
      expect(data.list.data.length).toBe(0);
    });
  });
});
