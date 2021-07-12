import React from "react";
import { mount } from "enzyme";
import FilterBool from "./FilterBool";
import Provider from "test/TestProvider";
import store from "app";
import { setSearchTerm } from "app/ContentModule";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<FilterBool />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const spy = jest.fn();
      const wrapper = mount(
        <Provider>
          <FilterBool onChange={spy} />
        </Provider>
      );
      wrapper.find('.USFilterControl__item').at(0).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
});
