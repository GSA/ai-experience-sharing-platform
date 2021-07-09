import React from "react";
import { mount } from "enzyme";
import Header from "templates/Primary/Header";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";
import store from "app";
import { name as siteName, getMenus } from "app/SiteModule";
import { getPage } from "app/ContentModule";

describe("<Header />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(getPage({ name: "test" }));
      await store.dispatch(getMenus());
      const wrapper = mount(
        <TestProvider>
          <Header />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      const navLink = wrapper.find("button[title=\"DropdownOne\"]");
      expect(navLink.length).toBe(1);
      navLink.simulate('click');
      navLink.simulate('click');
      navLink.simulate('click');
      wrapper.find(".usa-nav__submenu-item a").simulate('click');
      wrapper.find(".usa-nav-open").simulate('click');
      wrapper.find(".usa-nav-close").simulate('click');
    });
  });
});
