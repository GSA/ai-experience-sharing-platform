import React from "react";
import { mount } from "enzyme";
import Mdx from "features/Mdx";

describe("<Mdx />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<Mdx>{"# Test"}</Mdx>);
      expect(wrapper.text()).toBe("Test");
      expect(wrapper.find("h1").length).toBe(1);
    });
  });
});
