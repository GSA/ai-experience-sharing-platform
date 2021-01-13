import React from "react";
import { mount } from "enzyme";
import Default from "routes/Default";
import TestProvider from "test/TestProvider";

describe("<Default />", () => {
  describe("default render", () => {
    it("should render", () => {
      window.scrollTo = jest.fn();
      const wrapper = mount(
        <TestProvider>
          <Default />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
