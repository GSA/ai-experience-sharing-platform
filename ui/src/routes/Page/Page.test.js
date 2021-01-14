import React from "react";
import { mount } from "enzyme";
import Page from "./index";
import TestProvider from "test/TestProvider";
import store from "app";
import runAsyncRender from "test/utils/runAsyncRender";
import { Route } from "react-router-dom";

describe("Page", () => {
  describe("default render", () => {
    it("should render", async () => {
      window.scrollTo = jest.fn();
      const wrapper = mount(
        <TestProvider store={store} route={["/test"]}>
          <Route path="/:name" component={Page} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find("h2").text()).toBe("Test Hero");
    });
    it("should render error on incorrect path name", async () => {
      const wrapper = mount(
        <TestProvider store={store} route={["/error"]}>
          <Route path="/:name" component={Page} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find(".US__FourOhFour").length).toBe(1);
    });
  });
});
