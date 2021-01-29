import React from "react";
import { mount } from "enzyme";
import Date from "components/Date";

describe("<Date />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<Date>01/01/2020</Date>);
      expect(wrapper.text()).toBe("January 1, 2020");
    });

    it("should render format", () => {
      const wrapper = mount(<Date format={"MM-DD-YYYY"}>01/01/2020</Date>);
      expect(wrapper.text()).toBe("01-01-2020");
    });
  });
});
