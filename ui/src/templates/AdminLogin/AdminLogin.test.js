import React from "react";
import { mount } from "enzyme";
import AdminLogin from "templates/AdminLogin";
import TestProvider from "test/TestProvider";
import store from "app";
import { login } from "app/AuthModule";
import { Route } from "react-router-dom";
import runAsyncRender from "test/utils/runAsyncRender";

const creds = { token: "test" };

describe("<AdminLogin />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <AdminLogin />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });

    it("should render authenticated", async () => {
      await store.dispatch(login(creds));
      const wrapper = mount(
        <TestProvider>
          <AdminLogin />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
