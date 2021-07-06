import { configureStore } from "@reduxjs/toolkit";
import reducer, {
  initialState,
  getPage,
  getList,
  reset,
  clearPage,
  clearList,
  setListFilter,
  setListDefaults,
  resetListFilter,
  setListSort,
  resetListSort,
  setSearchTerm,
} from "./index";

const store = configureStore({ reducer });

describe("ContentModule", () => {
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
      expect(state.list.data.length).toBe(3);
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
    it("should reset the search term if we're viewing a usecase", async () => {
      await store.dispatch(setSearchTerm('10x'));
      await store.dispatch(getPage({ name: "test", slug: 2 }));
      const state = await store.getState();
      expect(state.searchTerm).toBe('');
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

  describe('filters, sorts and defaults', () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should filter lists for enums", async () => {
      await store.dispatch(setListFilter({
        name: 'metadataAgency',
        type: 'enumeration',
        value: 'GSA',
        operand: 'eq',
      }));
      await store.dispatch(setListFilter({
        name: 'metadataAgency',
        type: 'enumeration',
        value: 'NIH',
        operand: 'eq',
      }));
      await store.dispatch(setListFilter({
        name: 'metadataAgency',
        type: 'enumeration',
        value: 'GSA',
        operand: 'eq',
      }));
      const data = await store.getState();
      expect(data.list.filter[0].name).toBe('metadataAgency');
    });

    it("should filter lists for bools", async () => {
      await store.dispatch(setListFilter({
        name: 'metadataSpiiPiiUse',
        type: 'boolean',
        value: 'true',
        operand: 'eq',
      }));
      await store.dispatch(setListFilter({
        name: 'metadataSpiiPiiUse',
        type: 'boolean',
        value: 'true',
        operand: 'eq',
      }));
      const data = await store.getState();
      expect(data.list.filter[0].name).toBe('metadataSpiiPiiUse');
    });

    it("should set list to a default", async () => {
      await store.dispatch(setListFilter({
        name: 'metadataAgency',
        type: 'enumeration',
        value: 'GSA',
        operand: 'eq',
      }));
      let data = await store.getState();
      expect(data.list.filter[0].name).toBe('metadataAgency');
      await store.dispatch(setListDefaults({
        filter: [],
      }));
      data = await store.getState();
      expect(data.list.filter[0]).toBeUndefined();
    });

    it("should reset list", async () => {
      await store.dispatch(setListFilter({
        name: 'metadataAgency',
        type: 'enumeration',
        value: 'GSA',
        operand: 'eq',
      }));
      let data = await store.getState();
      expect(data.list.filter[0].name).toBe('metadataAgency');
      await store.dispatch(resetListFilter());
      data = await store.getState();
      expect(data.list.filter[0]).toBeUndefined();
    });

    it("should sort a list", async () => {
      await store.dispatch(setListSort({
        name: 'metadataAgency',
        dir: 'asc',
      }));
      const data = await store.getState();
      expect(data.list.sort.name).toBe('metadataAgency');
    });

    it("should sort a list", async () => {
      await store.dispatch(setListSort({
        name: 'metadataAgency',
        dir: 'asc',
      }));
      let data = await store.getState();
      expect(data.list.sort.name).toBe('metadataAgency');
      await store.dispatch(resetListSort());
      data = await store.getState();
      expect(data.list.sort.name).toBe('publishedDate');
    });

    it("should set a search term", async () => {
      await store.dispatch(setSearchTerm('10x'));
      const data = await store.getState();
      expect(data.searchTerm).toBe('10x');
    });
  });
});
