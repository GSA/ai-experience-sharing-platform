import React from "react";
import { mount } from "enzyme";
import FilterStatus from "./FilterStatus";
import Provider from "test/TestProvider";
import store from "app";
import { getList, setListDefaults, reset, setListFilter } from "app/ContentModule";
import { getUsecaseSettings } from "app/SiteModule";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<FilterStatus />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getUsecaseSettings());
      await store.dispatch(setListDefaults({type: 'usecases' }));
      await store.dispatch(setListFilter({
        name: 'metadataAgency',
        type: 'enumeration',
        value: 'GSA',
        operand: 'eq',
      }));
      const wrapper = mount(
        <Provider>
          <FilterStatus />
        </Provider>
      );
      act(() => {
        wrapper.find('button').simulate('click');
      });
      expect(wrapper.find('button').length).toBe(1);
    });
  });
});
