import React from "react";
import { mount } from "enzyme";
import Primary from "templates/Primary";
import TestProvider from "test/TestProvider";
import runAsyncRender from "test/utils/runAsyncRender";
import store from "app";
import { getPage } from "app/ContentModule";
import { login } from "app/AuthModule";

describe("<Primary />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(getPage({ name: "test" }));
      const wrapper = mount(
        <TestProvider>
          <Primary>
            <span className="test" />
          </Primary>
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find(".test").length).toBe(1);
      expect(wrapper.find(".US_loginPrompt").length).toBe(1);
    });
  });
  it("should render when authenticated", async () => {
    await store.dispatch(login({ token: "test" }));
    await store.dispatch(getPage({ name: "test" }));
    const wrapper = mount(
      <TestProvider>
        <Primary />
      </TestProvider>
    );
    expect(wrapper.find(".US_loginPrompt").length).toBe(0);
    const button = wrapper.find("button#sign-out");
    button.simulate("click");
    wrapper.update();
    expect(wrapper.find(".US_loginPrompt").length).toBe(1);
  });
});
