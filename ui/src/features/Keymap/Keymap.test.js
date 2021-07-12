import React from "react";
import { mount } from "enzyme";
import Keymap from "features/Keymap";
import * as reactRedux from 'react-redux'
import { name as siteName } from "app/SiteModule";

describe("<Keymap />", () => {
  describe("default render", () => {
    it("should render", () => {
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ [siteName]: {keymaps: {testval: 'Test Val'}} });

      const wrapper = mount(
        <Keymap value="testval" />
      );
      expect(wrapper.html()).toBe('Test Val');
    });
    it("should render if no key map", () => {
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ [siteName]: {keymaps: {testval: 'Test Val'}} });

      const wrapper = mount(
        <Keymap value="testval2" />
      );
      expect(wrapper.html()).toBe('testval2');
    });
    it("should render if no key map", () => {
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ [siteName]: {} });

      const wrapper = mount(
        <Keymap value="testval2" />
      );
      expect(wrapper.html()).toBe('testval2');
    });
  });
});
