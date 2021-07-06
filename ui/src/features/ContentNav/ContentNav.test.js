import React from "react";
import { mount } from "enzyme";
import ContentNav from "features/ContentNav";

describe("<ContentNav />", () => {
  describe("default render", () => {
    it("should render", () => {
      const items = [
        { title: 'onetitle' },
        { title: 'twotitle' },
      ];
      const wrapper = mount(
        <ContentNav items={items} />
      );
      expect(wrapper.find("a").length).toBe(2);
    });
  });
});
