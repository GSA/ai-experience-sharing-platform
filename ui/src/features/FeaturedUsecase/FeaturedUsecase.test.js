import React from "react";
import { mount } from "enzyme";
import FeaturedUsecase from "features/FeaturedUsecase";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";

describe("<FeaturedUsecase />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <FeaturedUsecase />
        </TestProvider>
      );

      await runAsyncRender(wrapper);
      expect(wrapper.find("h3").length).toBe(2);
    });
  });
});
