import React from "react";
import { mount } from "enzyme";
import UsecaseLoginRedirect from "features/Login/UsecaseLoginRedirect";
import TestProvider from "test/TestProvider";
import { login, reset } from "app/AuthModule";
import store from "app";

describe("<UsecaseLoginRedirect />", () => {
  describe("default render", () => {
    it("should unauthenticated render", async () => {
      const wrapper = mount(
        <TestProvider>
          <UsecaseLoginRedirect loginUrl='/test' />
        </TestProvider>
      );
    });
    it("should render", async () => {
      await store.dispatch(login({ token: "test" }));
      const wrapper = mount(
        <TestProvider>
          <UsecaseLoginRedirect loginUrl='/test' />
        </TestProvider>
      );
    });
  });
});
