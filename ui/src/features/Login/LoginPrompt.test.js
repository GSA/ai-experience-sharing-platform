import React from "react";
import { mount } from "enzyme";
import LoginPrompt from "./LoginPrompt";
import TestProvider from "test/TestProvider";
import store from "app";
import { getMenus } from "app/SiteModule";
import { getPage } from "app/ContentModule";

describe("<LoginPrompt />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(getPage({ name: "test" }));
      await store.dispatch(getMenus());
      const wrapper = mount(
        <TestProvider>
          <LoginPrompt />
        </TestProvider>
      );
      const button = wrapper.find(".usa-button");
      button.simulate("click");
      wrapper.update();
    });
  });
});
