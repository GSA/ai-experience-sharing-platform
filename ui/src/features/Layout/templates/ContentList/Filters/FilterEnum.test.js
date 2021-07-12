import React from "react";
import { mount } from "enzyme";
import FilterEnum from "./FilterEnum";
import Provider from "test/TestProvider";
import store from "app";
import { setSearchTerm } from "app/ContentModule";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<FilterEnum />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const spy = jest.fn();
      const items = [{
        name: 'one',
        title: 'title one',
      }];
      const wrapper = mount(
        <Provider>
          <FilterEnum onChange={spy} items={items} />
        </Provider>
      );
      wrapper.find('.USFilterControl__item').at(0).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
