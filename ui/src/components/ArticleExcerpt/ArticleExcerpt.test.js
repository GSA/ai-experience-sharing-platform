import React from "react";
import { mount } from "enzyme";
import ArticleExcerpt from "components/ArticleExcerpt";
import TestProvider from "test/TestProvider";

describe("<ArticleExcerpt />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <ArticleExcerpt
            title="test title"
            date="01/01/2020"
            path="/test"
            excerpt="test excerpt"
          />
        </TestProvider>
      );
      const render = wrapper.find("h5");
      expect(render.length).toBe(1);
    });
  });
});
