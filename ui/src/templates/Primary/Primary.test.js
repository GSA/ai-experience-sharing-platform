import React from "react";
import { mount } from "enzyme";
import Primary from "templates/Primary";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";
import store from "app";
import { getPage } from "app/ContentModule";

describe("<Primary />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(getPage({ name: "test" }));
      const wrapper = mount(
        <TestProvider>
          <Primary>
            <span className="test" />
          </Primary>
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find(".test").length).toBe(1);
    });
  });
});
