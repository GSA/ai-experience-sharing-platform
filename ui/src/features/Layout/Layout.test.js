import React from "react";
import { mount } from "enzyme";
import Layout from "./index";

import Provider from "test/TestProvider";

const items = [
  { __component: "component.break" },
  { __component: "component.markdown" },
  { __component: "component.markdown", bodyRendered: "One two three" },
  { __component: "component.markdown", bodyRendered: "One two three <Card />" },
  { __component: "component.projects" },
  { __component: "component.callout", fullwidth: true },
  { __component: "component.cards", cardItem: [] },
  { __component: "component.title" },
  { __component: "component.links" },
  { __component: "component.usecase-list" },
  { __component: "component.content-list" },
];

describe("<Layout />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Provider>
          <Layout items={items} />
        </Provider>
      );
      expect(wrapper.find(".grid-container").hostNodes().length).toBe(9);
    });
  });
});
