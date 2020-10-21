import React from "react";
import { mount } from "enzyme";
import Primary from "templates/Primary";
import TestProvider from "test/TestProvider";
import Footer from "./Footer";
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

    it("should render nav header", async () => {
      window.innerWidth = 300;
      await store.dispatch(login({ provider: "test" }));
      const wrapper = mount(
        <TestProvider>
          <Primary>
            <h1>Test Primary</h1>
          </Primary>
        </TestProvider>
      );
      wrapper.find(".usa-nav-open").hostNodes().simulate("click");
      await runAsyncRender(wrapper);
      expect(wrapper.find(".Logout__link").hostNodes().length).toBe(1);
    });
  });

  describe("interactive features", () => {
    it("should handle scroll click", () => {
      window.scrollTo = jest.fn();
      const wrapper = mount(
        <TestProvider>
          <Footer />
        </TestProvider>
      );
      wrapper.find(".usa-footer__scroll").first().simulate("click");
      expect(window.scrollTo).toBeCalled();
    });
  });
});
