import React from "react";
import { mount } from "enzyme";
import Page from "./index";
import TestProvider from "test/TestProvider";
import store from "app";
import runAsyncRender from "test/utils/runAsyncRender";
import { Route } from "react-router-dom";

describe("AdminLogin", () => {
  describe("default render", () => {
    it("should render", async () => {
      window.scrollTo = jest.fn();
      const wrapper = mount(
        <TestProvider store={store} route={["/test"]}>
          <Route path="/:name" component={Page} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find("button.Login__link").text()).toMatch("Agree and Continue");
    });
  });
});
