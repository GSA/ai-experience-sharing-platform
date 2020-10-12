import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import Primary from "templates/Primary";
import TestProvider from "test/TestProvider";
import store from "app";
import { login } from "app/AuthModule";
import runAsyncRender from "test/utils/runAsyncRender";

describe("<Primary />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Primary>
            <h1>Test Primary</h1>
          </Primary>
        </TestProvider>
      );
      expect(wrapper.find("h1").text()).toBe("Test Primary");
    });
  });
});
