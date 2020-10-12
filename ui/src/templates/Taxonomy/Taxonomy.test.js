import React from "react";
import { mount } from "enzyme";
import Taxonomy from "templates/Taxonomy";
import TestProvider from "test/TestProvider";

describe("<Taxonomy />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Taxonomy />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
