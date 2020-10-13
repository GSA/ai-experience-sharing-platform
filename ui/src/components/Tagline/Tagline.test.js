import React from "react";
import { mount } from "enzyme";
import Tagline from "components/Tagline";
import TestProvider from "test/TestProvider";

describe("<Tagline />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Tagline title="check">
          <span className="test-tagline">test</span>
        </Tagline>
      );
      expect(wrapper.find(".test-tagline").length).toBe(1);
    });
  });
});