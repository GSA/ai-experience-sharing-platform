import React from "react";
import { mount } from "enzyme";
import Banner from "components/Banner";
import TestProvider from "test/TestProvider";

describe("<Banner />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Banner />
        </TestProvider>
      );
      expect(wrapper.find(".usa-banner").length).toBe(1);
    });
  });
  describe("on click", () => {
    it("should should display content", () => {
      const wrapper = mount(
        <TestProvider>
          <Banner />
        </TestProvider>
      );
      const button = wrapper.find(".usa-banner__button");
      button.simulate("click");
      wrapper.update();
      expect(wrapper.find(".usa-banner__content").hostNodes().length).toBe(1);
    });
  });
});
