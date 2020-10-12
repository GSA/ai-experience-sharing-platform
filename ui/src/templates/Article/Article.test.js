import React from "react";
import { mount } from "enzyme";
import Article from "templates/Article";
import TestProvider from "test/TestProvider";

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
});
