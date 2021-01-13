import React from "react";
import { mount } from "enzyme";
import Layout from "./index";

import Provider from "test/TestProvider";

const items = [
  { type: "break" },
  { type: "markdown" },
  { type: "projects" },
  { type: "callout" },
  { type: "cards" },
  { type: "title" },
  { type: "links" },
];

describe("<Layout />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Provider>
          <Layout items={items} />
        </Provider>
      );
      expect(wrapper.find(".grid-container").hostNodes().length).toBe(7);
    });
  });
});
