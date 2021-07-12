import React from "react";
import { mount } from "enzyme";
import FilterControl from "./FilterControl";
import Provider from "test/TestProvider";
import store from "app";
import { setSearchTerm } from "app/ContentModule";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<FilterControl />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <Provider>
          <FilterControl type="boolean" />
        </Provider>
      );
      wrapper.find('.usa-accordion__button').at(0).simulate('click');
      wrapper.find('.USFilterControl__item').at(0).simulate('click');
    });
    it("should render a default", async () => {
      const wrapper = mount(
        <Provider>
          <FilterControl type="bad-type" />
        </Provider>
      );
      wrapper.find('.usa-accordion__button').at(0).simulate('click');
    });
  });
});
