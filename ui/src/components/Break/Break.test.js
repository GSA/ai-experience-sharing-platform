import React from "react";
import { mount, render } from "enzyme";
import Break from "components/Break";
import Provider from "test/TestProvider";

describe("<Break />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Provider>
          <Break />
        </Provider>
      );
      expect(wrapper.find(".USBreak").length).toBeTruthy();
    });
  });
});
