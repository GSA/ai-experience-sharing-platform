import React from "react";
import { mount } from "enzyme";
import Login from "features/Login";
import TestProvider from "test/TestProvider";
import { login, reset } from "app/AuthModule";
import store from "app";

describe("<Login />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <Login />
        </TestProvider>
      );
      expect(wrapper.find(".Login__link").hostNodes().length).toBe(1);
    });
  });

  describe("form submission", () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should show children when authorized", async () => {
      await store.dispatch(login({ provider: "test" }));
      const wrapper = mount(
        <TestProvider store={store}>
          <Login>
            <h1 id="test-login">Test Login</h1>
          </Login>
        </TestProvider>
      );

      expect(wrapper.find("h1#test-login").length).toBe(1);
    });

    it("should set redirect", async () => {
      const wrapper = mount(
        <TestProvider store={store} route={["/test"]}>
          <Login>
            <h1 id="test-login">Test Login</h1>
          </Login>
        </TestProvider>
      );
      wrapper.find(".Login__link").hostNodes().simulate("click");
      const {
        auth: { redirect },
      } = await store.getState();
      expect(redirect).toBe("/test");
    });

    it("should render error", async () => {
      await store.dispatch(login({ provider: "error" }));
      const wrapper = mount(
        <TestProvider store={store} route={["/test"]}>
          <Login>
            <h1 id="test-login">Test Login</h1>
          </Login>
        </TestProvider>
      );
      expect(wrapper.find(".usa-alert--error").hostNodes().length).toBe(1);
    });
  });
});
