import React from "react";
import { mount } from "enzyme";
import ContentList from "./index";
import TestProvider from "test/TestProvider";
import store from "app";
import runAsyncRender from "test/utils/runAsyncRender";

describe("ContentList", () => {
  describe("default render", () => {
    it("should render two titles", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <ContentList />
        </TestProvider>
      );
      await runAsyncRender(wrapper);

      expect(wrapper.find(".ContentList__item").length).toBe(2);
    });
    it("should render error on incorrect type", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <ContentList type="error" />
        </TestProvider>
      );
      await runAsyncRender(wrapper);

      expect(wrapper.find(".ContentList__error").length).toBe(1);
    });

    it("should render custom Error component", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <ContentList
            type="error"
            error={() => <h1 id="TestError">Test Error</h1>}
          />
        </TestProvider>
      );
      await runAsyncRender(wrapper);

      expect(wrapper.find("#TestError").length).toBe(1);
    });
  });
});
