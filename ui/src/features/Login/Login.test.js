import React from "react";
import { mount } from "enzyme";
import Login from "features/Login";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";
import { reset } from "app/AuthModule";
import store from "app";

describe("<Login />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <Login />
        </TestProvider>
      );

      await runAsyncRender(wrapper);
      expect(wrapper.find(".usa-login-form").length).toBe(1);
    });
  });

  describe("form submission", () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should show error for invalid submit", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <Login />
        </TestProvider>
      );

      wrapper.find("form.usa-login-form").simulate("submit", {
        preventDefault: () => null,
        target: { username: { value: "" }, password: { value: "" } },
      });
      await runAsyncRender(wrapper);
      expect(wrapper.find(".usa-form-group--error").length).toBe(1);
    });

    it("should show children with valid submit", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <Login>
            <h1 id="test-login">Test Login</h1>
          </Login>
        </TestProvider>
      );
      wrapper.find("form.usa-login-form").simulate("submit", {
        preventDefault: () => null,
        target: {
          username: { value: "jarvis" },
          password: { value: "vision" },
        },
      });
      await runAsyncRender(wrapper);
      const state = store.getState();
      expect(wrapper.find("h1#test-login").length).toBe(1);
    });
  });
});
