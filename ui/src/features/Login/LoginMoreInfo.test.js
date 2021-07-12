import React from "react";
import { mount } from "enzyme";
import LoginMoreInfo from "features/Login/LoginMoreInfo";
import TestProvider from "test/TestProvider";
import { login, reset } from "app/AuthModule";
import store from "app";

describe("<LoginMoreInfo />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <LoginMoreInfo>
            <div id='more'>More information here</div>
          </LoginMoreInfo>
        </TestProvider>
      );
      wrapper.find('button').simulate('click');
      expect(wrapper.find('#more').length).toBe(1);
    });
  });
});
