import React from "react";
import { mount } from "enzyme";
import Hero from "components/Hero";
import TestProvider from "test/TestProvider";

describe("<Hero />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Hero />
        </TestProvider>
      );
      expect(wrapper.find(".usa-hero").length).toBe(1);
    });
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Hero heroImage={{ url: "https://gsa.gov" }} >
            <p>body</p>
          </Hero>
        </TestProvider>
      );
      expect(wrapper.find(".usa-hero").length).toBe(1);
    });
    it("should render prebaked markdown", () => {
      const wrapper = mount(
        <TestProvider>
          <Hero heroImage={{ url: "https://gsa.gov" }} bodyRendered="<div>pre rendered content</div>" >
            <p>body</p>
          </Hero>
        </TestProvider>
      );
      expect(wrapper.find(".usa-hero").length).toBe(1);
    });
  });
});
