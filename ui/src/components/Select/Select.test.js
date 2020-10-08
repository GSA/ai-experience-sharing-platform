import React from "react";
import { mount } from "enzyme";
import Select from "components/Select";

const items = ["one", 2, { key: "Three", value: 3 }];

describe("<Select />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<Select items={items} />);
      expect(wrapper.find("option").length).toBe(3);
    });
    it("should render placeholder", () => {
      const wrapper = mount(<Select items={items} placeholder="test" />);
      expect(wrapper.find("option").length).toBe(4);
      expect(wrapper.find("optgroup").length).toBe(1);
    });
  });
});
