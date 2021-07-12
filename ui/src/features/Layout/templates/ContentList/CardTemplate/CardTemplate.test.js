import React from "react";
import { mount } from "enzyme";
import CardTemplate from "./index";
import Provider from "test/TestProvider";
import store from "app";
import { setSearchTerm } from "app/ContentModule";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<CardTemplate />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <Provider>
          <CardTemplate template="markdown" data={{}} />
        </Provider>
      );
      expect(wrapper.find('Mdx').length).toBe(1);
    });
    it("should render a default", async () => {
      const wrapper = mount(
        <Provider>
          <CardTemplate template="bad-template" data={{ title: 'Test title' }} />
        </Provider>
      );
      expect(wrapper.find('div').length).toBe(1);
    });
  });
});
