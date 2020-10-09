import React from "react";
import { mount } from "enzyme";
import Hero from "features/Hero";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";

describe("<Hero />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <Hero />
        </TestProvider>
      );

      await runAsyncRender(wrapper);
      expect(wrapper.find(".usa-hero").length).toBe(1);
    });
    it("should render with bg image", async () => {
      const wrapper = mount(
        <TestProvider>
          <Hero background="/images.test.jpg" />
        </TestProvider>
      );

      await runAsyncRender(wrapper);
      expect(wrapper.find(".usa-hero").length).toBe(1);
    });
  });
});
