import React from "react";
import { mount } from "enzyme";
import Homepage from "routes/Homepage";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";

describe("<Homepage />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <Homepage />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });

    it("should return 404 on error", async () => {
      const wrapper = mount(
        <TestProvider>
          <Homepage name="error" />
        </TestProvider>
      );

      await runAsyncRender(wrapper);

      expect(wrapper.find("h1").text()).toBe("NOT FOUND");
    });
  });
});
