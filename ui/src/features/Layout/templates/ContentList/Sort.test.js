import React from "react";
import { mount } from "enzyme";
import Sort from "./Sort";
import Provider from "test/TestProvider";
import store from "app";
import { getUsecaseSettings } from "app/SiteModule";
import { act } from 'react-dom/test-utils';

describe("<Sidebar />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(getUsecaseSettings());
      const wrapper = mount(
        <Provider>
          <Sort />
        </Provider>
      );
      act(() => {
        wrapper.find('.usa-select').simulate("change", {
          target: { value: "metadataAgency", selectedIndex: 1 }
        });
      });
      act(() => {
        wrapper.find('.usa-select').simulate("change", {
          target: { value: "publishedDate", selectedIndex: 0 }
        });
      });
      expect(wrapper.find('.usa-select').length).toBe(1);
    });
  });
});
