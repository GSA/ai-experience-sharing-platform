import React from "react";
import { mount } from "enzyme";
import Logout from "features/Logout";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";
import { reset } from "app/AuthModule";
import store from "app";

describe("<Logout />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider>
          <Logout />
        </TestProvider>
      );

      await runAsyncRender(wrapper);
      expect(wrapper.find("button").length).toBe(1);
    });
  });

  describe("form submission", () => {
    beforeEach(async () => await store.dispatch(reset()));

    it("should update the state when clicked", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <Logout className="test-logout" />
        </TestProvider>
      );
      wrapper.find("button.test-logout").simulate("click", {});
      await runAsyncRender(wrapper);
      const state = store.getState();
      expect(state.auth.isAuth).toBeFalsy();
    });
  });
});
