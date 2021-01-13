import React from "react";
import { mount } from "enzyme";
import List from "components/List";

describe("<List />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<List />);
      expect(wrapper.find(".List").length).toBe(1);
    });
    it("should render variant", () => {
      const wrapper = mount(
        <List variant="check">
          <ul>
            <li>test</li>
          </ul>
        </List>
      );
      expect(wrapper.find(".List__check").length).toBe(1);
    });
  });
});
