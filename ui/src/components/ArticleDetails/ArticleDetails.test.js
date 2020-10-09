import React from "react";
import { mount } from "enzyme";
import ArticleDetails from "components/ArticleDetails";
import TestProvider from "test/TestProvider";

describe("<ArticleDetails />", () => {
  describe("default render", () => {
    it("should render", () => {
      const id = "test-id";
      const title = "test title";
      const items = [
        { key: "test1", title: "ABC", value: "123" },
        { key: "date", title: "Date", value: "01/01/202" },

        { key: "test2", title: "ABC", value: ["1", "2", "3"] },
      ];
      const wrapper = mount(
        <TestProvider>
          <ArticleDetails id={id} title={title} items={items} />
        </TestProvider>
      );
      const render = wrapper.find("h4");
      expect(render.text()).toBe(title);
    });
  });
});
