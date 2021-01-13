import React from "react";
import { mount } from "enzyme";
import Card from "components/Card";

describe("<Card />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(<Card title="Test" />);
      expect(wrapper.find(".usa-card")).toBeTruthy();
    });
  });
  describe("props", () => {
    it("should render with all props", async () => {
      const props = {
        className: "test",
        image: "test",
        imageAlt: "test",
        meta: "test",
        title: "test",
        subtitle: "test",
        children: "test",
        footer: "test",
        variant: "horizontal",
        flat: true,
      };
      const wrapper = mount(<Card {...props} />);
      expect(wrapper.find(".usa-card")).toBeTruthy();
      expect(wrapper.find(".usa-card--flag")).toBeTruthy();
    });
    it("should render with no content", async () => {
      const props = {
        className: "test",
        image: "test",
        imageAlt: "test",
        footer: "test",
        variant: "vertical",
        flat: true,
      };
      const wrapper = mount(<Card {...props} />);
      expect(wrapper.find(".usa-card--no-content")).toBeTruthy();
      expect(Object.keys(wrapper.find(".usa-card__header")).length).toBeFalsy();
    });
  });
});
