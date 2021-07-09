import React from "react";
import { mount } from "enzyme";
import Date from "components/Date";

describe("<Date />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<Date>01/01/2020</Date>);
      expect(wrapper.text()).toBe("1/1/2020");
    });

    it("should render format", () => {
      const wrapper = mount(<Date format={"full"}>01/01/2020</Date>);
      expect(wrapper.text()).toBe("Wednesday, January 1, 2020");
    });

    it("should not blow up on bad data", () => {
      const wrapper = mount(<Date format={"full"}>z0134/42z01/24234020</Date>);
      expect(wrapper.text()).toBe("");
    });
  });
});
