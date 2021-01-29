import React from "react";
import { mount } from "enzyme";
import Icon from "components/Icon";
import TestProvider from "test/TestProvider";

describe("<Icon />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Icon icon="check" />
        </TestProvider>
      );
      expect(wrapper.find(".fa-check").length).toBe(1);
    });
  });
});
