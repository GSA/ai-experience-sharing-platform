import React from "react";
import { mount } from "enzyme";
import PrimaryNav from "features/PrimaryNav";
import TestProvider from "test/TestProvider";
import resizeWindow from "test/utils/resizeWindow";

const items1 = [
  {
    text: "test",
    link: "/test",
  },
  {
    text: "test2",
    link: "/test2",
  },
  {
    text: "test3",
    link: "/test3",
  },
];

const items2 = [
  {
    text: "test1",
    link: "/test1",
    items: [
      {
        text: "test-1-1",
        link: "/test1/1",
      },
      {
        text: "test-1-2",
        link: "/test1/2",
      },
    ],
  },
];

describe("<PrimaryNav />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <PrimaryNav
            items={items1}
            header={<div className="test-header" />}
            footer={<div className="test-footer" />}
          />
        </TestProvider>
      );
      const button = wrapper.find("#usa-nav-item-1").hostNodes();
      button.simulate("click");
      wrapper.update();
      expect(wrapper.find(".usa-nav__primary-item").length).toBe(3);
      expect(wrapper.find(".test-header").hostNodes().length).toBe(1);
      expect(wrapper.find(".test-footer").hostNodes().length).toBe(1);
    });
    it("should render nested menu", () => {
      const wrapper = mount(
        <TestProvider>
          <PrimaryNav items={items2} />
        </TestProvider>
      );
      const button = wrapper.find(".usa-nav__link").hostNodes();
      button.simulate("click");
      wrapper.update();
      expect(wrapper.find(".usa-nav__submenu-item").length).toBe(2);
    });
  });

  describe("mobile menu", () => {
    beforeEach(() => {
      resizeWindow(400, 800);
    });
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <PrimaryNav items={items1} />
        </TestProvider>
      );
      expect(wrapper.find("button#usa-nav-open").length).toBe(1);
    });
    it("should open menu", () => {
      const wrapper = mount(
        <TestProvider>
          <PrimaryNav items={items1} />
        </TestProvider>
      );
      const button = wrapper.find("button#usa-nav-open");
      button.simulate("click");
      wrapper.update();
      expect(wrapper.find("button#usa-nav-close").length).toBe(1);
    });
  });
});
