import React from "react";
import { mount } from "enzyme";
import Library from "routes/Library";
import TestProvider from "test/TestProvider";
import { Route } from "react-router-dom";

describe("<Library />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider route={["/library/test"]}>
          <Route path="/library">
            <Library />
          </Route>
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
});
