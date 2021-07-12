import React from "react";
import { mount } from "enzyme";
import GSAFooter from "./index";

describe("<Layout />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <GSAFooter />
      );
      expect(wrapper.find(".GSAFooter").length).toBe(1);
    });
  });
});
