import React from "react";
import { mount } from "enzyme";
import Alert from "components/Alert";
import TestProvider from "test/TestProvider";

describe("<Alert />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Alert variant="error" title="Test Title">
            Test Content
          </Alert>
        </TestProvider>
      );
      expect(wrapper.find(".usa-alert--error").hostNodes().length).toBe(1);
      expect(wrapper.find(".usa-alert__heading").hostNodes().text()).toBe(
        "Test Title"
      );
      expect(wrapper.find(".usa-alert__text").hostNodes().text()).toBe(
        "Test Content"
      );
    });
  });
});
