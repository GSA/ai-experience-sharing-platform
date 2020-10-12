import React from "react";
import { mount } from "enzyme";
import Page from "routes/Page";
import TestProvider from "test/TestProvider";

describe("<Page />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Page />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
