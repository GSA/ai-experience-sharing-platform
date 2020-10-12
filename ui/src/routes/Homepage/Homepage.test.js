import React from "react";
import { mount } from "enzyme";
import Homepage from "routes/Homepage";
import TestProvider from "test/TestProvider";

describe("<Homepage />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Homepage />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
