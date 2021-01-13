import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  getPage,
  getList,
  reset,
} from "app/ContentModule";

const store = configureStore({ reducer });

describe("ContentModule", () => {
  describe("initialState", () => {
    it("should load the initial state", async () => {
      const state = await store.getState();
      expect(JSON.stringify(state)).toBe(JSON.stringify(initialState));
    });
  });
  describe(".getList", () => {
    beforeEach(async () => store.dispatch(reset()));
    it("should load a list of content", async () => {
      await store.dispatch(getList({ type: "test" }));
      const state = store.getState();
      expect(state.list.data.length).toBe(2);
    });
    it("should load an error", async () => {
      await store.dispatch(getList({ type: "error" }));
      const state = store.getState();
      expect(state.list.error.message).toBe("Invalid Type.");
    });
  });
  describe(".getPage", () => {
    beforeEach(async () => store.dispatch(reset()));

    it("should load a page's content", async () => {
      await store.dispatch(getPage({ name: "test" }));
      const state = store.getState();
      expect(state.page.data).toBeTruthy();
    });
    it("should load an error when incorrect type is passed", async () => {
      await store.dispatch(getPage({ type: "error", name: "test" }));
      const data = store.getState();
      expect(data.page.error.message).toBe("Invalid Type.");
    });
    it("should load an error when no name is passed", async () => {
      await store.dispatch(getPage({ name: "" }));
      const data = store.getState();
      expect(data.page.error.message).toBe("Invalid Name.");
    });
    it("should load an error when no props are passed", async () => {
      await store.dispatch(getPage({}));
      const data = store.getState();
      expect(data.page.error.message).toBe("Invalid Name.");
    });
  });
});
