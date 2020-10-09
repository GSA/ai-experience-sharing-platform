import React from "react";
import { mount } from "enzyme";
import ContentsNav from "components/ContentsNav";
import TestProvider from "test/TestProvider";

const items = [
  { text: "test", url: "/test", items: [{ text: "test2", url: "/test2" }] },
];

describe("<ContentsNav />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<ContentsNav items={items} />);
      expect(wrapper.find(".ContentNav__item").length).toBe(2);
    });
  });
});
