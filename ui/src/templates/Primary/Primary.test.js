import React from "react";
import { mount } from "enzyme";
import Primary from "templates/Primary";
import TestProvider from "test/TestProvider";
import Footer from "./Footer";

describe("<Primary />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Primary>
            <h1>Test Primary</h1>
          </Primary>
        </TestProvider>
      );
      expect(wrapper.find("h1").text()).toBe("Test Primary");
    });
  });
  describe("interactive features", () => {
    it("should handle scroll click", () => {
      window.scrollTo = jest.fn();
      const wrapper = mount(
        <TestProvider>
          <Footer />
        </TestProvider>
      );
      wrapper.find(".usa-footer__scroll").first().simulate("click");
      expect(window.scrollTo).toBeCalled();
    });
  });
});
