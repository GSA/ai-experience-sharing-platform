import React from "react";
import { mount } from "enzyme";
import PrimaryNavFooter from "features/PrimaryNavFooter";
import TestProvider from "test/TestProvider";
import resizeWindow from "test/utils/resizeWindow";
import store from "app";
import { name as siteName, getMenus } from "app/SiteModule";
import { getPage } from "app/ContentModule";
import { login } from "app/AuthModule";

describe("<PrimaryNavFooter />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(getPage({ name: "test" }));
      await store.dispatch(getMenus());
      const wrapper = mount(
        <TestProvider>
          <PrimaryNavFooter />
        </TestProvider>
      );
      wrapper.update();
    });
    it("should render when authenticated", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getPage({ name: "test" }));
      await store.dispatch(getMenus());
      const wrapper = mount(
        <TestProvider>
          <PrimaryNavFooter />
        </TestProvider>
      );
      const button = wrapper.find("button#sign-out");
      button.simulate("click");
      wrapper.update();
    });
  });
  describe('search', () => {
    it("should perform searches", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getPage({ name: "test" }));
      await store.dispatch(getMenus());
      const wrapper = mount(
        <TestProvider>
          <PrimaryNavFooter />
        </TestProvider>
      );
      wrapper.find('#query').simulate('change', { target: { value: 'Hello' }});
      wrapper.find("button[type='submit']").simulate("click");
      wrapper.find("form.usa-search").simulate('submit');
      wrapper.update();
      const state = await store.getState();
      expect(state.content.searchTerm).toBe('Hello');
    });
    it("should clear searches", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getPage({ name: "test" }));
      await store.dispatch(getMenus());
      const wrapper = mount(
        <TestProvider>
          <PrimaryNavFooter />
        </TestProvider>
      );
      wrapper.find('#query').simulate('change', { target: { value: 'Hello' }});
      wrapper.find("button[type='submit']").simulate("click");
      wrapper.find('#query').simulate('change', { target: { value: '' }});
      wrapper.find("button[type='submit']").simulate("click");
      wrapper.update();
      const state = await store.getState();
      expect(state.content.searchTerm).toBe('');
    });
  });
});
