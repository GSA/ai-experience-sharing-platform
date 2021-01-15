import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import Article from "routes/Usecase/Usecase";
import TestProvider from "test/TestProvider";
import store from "app";
import { login } from "app/AuthModule";
import runAsyncRender from "test/utils/runAsyncRender";

describe("<Article />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Article />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
  describe("load content when authenticated", () => {
    it("should render", async () => {
      await store.dispatch(login({ token: "test" }));
      const wrapper = mount(
        <TestProvider route={["/usecase/test"]}>
          <Route path="/:type/:name" component={Article} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find("h1").text()).toBeTruthy();
    });
  });
});
