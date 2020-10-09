import React from "react";
import { mount } from "enzyme";
import Loading from "components/Loading";
import TestProvider from "test/TestProvider";

describe("<Loading />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Loading isLoading={true} />
        </TestProvider>
      );
      expect(wrapper.find(".fa-spinner").length).toBe(1);
    });
    it("should render children", () => {
      const wrapper = mount(
        <TestProvider>
          <Loading isLoading={false}>
            <h1 className="test-loading">test</h1>
          </Loading>
        </TestProvider>
      );
      expect(wrapper.find(".test-loading").length).toBe(1);
    });
  });
});
