import React from "react";
import { mount } from "enzyme";
import Image from "components/Image";

describe("<Image />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Image />
      );
      expect(wrapper.find("img")).toBeTruthy();
    });
  });
});
