import React from "react";
import { mount } from "enzyme";
import PrimaryNavFooter from "features/PrimaryNavFooter";
import TestProvider from "test/TestProvider";
import resizeWindow from "test/utils/resizeWindow";

describe("<PrimaryNavFooter />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <PrimaryNavFooter />
        </TestProvider>
      );
      const button = wrapper.find(".usa-auth-button");
      button.simulate("click");
      wrapper.update();
    });
  });
});
