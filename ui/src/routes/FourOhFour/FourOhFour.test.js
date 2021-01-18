import React from "react";
import { mount } from "enzyme";
import FourOhFour from "routes/FourOhFour";
import TestProvider from "test/TestProvider";

describe("<FourOhFour />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <FourOhFour />
        </TestProvider>
      );
      expect(wrapper.find(".US__FourOhFour").hostNodes().length).toBe(1);
    });
  });
});
