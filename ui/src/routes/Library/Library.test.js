import React from "react";
import { mount } from "enzyme";
import Library from "routes/Library";
import TestProvider from "test/TestProvider";

describe("<Library />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider route={["/library/test"]}>
          <Library />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
