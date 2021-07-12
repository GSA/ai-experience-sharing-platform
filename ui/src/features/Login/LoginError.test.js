import React from "react";
import { mount } from "enzyme";
import LoginError from "./LoginError";
import Provider from "test/TestProvider";
import store from "app";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<LoginError />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(login({ provider: 'error' }));
      const wrapper = mount(
        <Provider>
          <LoginError />
        </Provider>
      );
      expect(wrapper.find('.usa-alert--error').length).toBe(1);
    });
  });
});
