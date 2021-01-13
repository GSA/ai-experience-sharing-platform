import React from "react";
import { mount } from "enzyme";
import Loading from "components/Loading";

describe("<Loading />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Loading isLoading={true}>
          <span className="test" />
        </Loading>
      );
      expect(wrapper.find(".fa-spinner")).toBeTruthy();
    });

    it("should render children", () => {
      const wrapper = mount(
        <Loading isLoading={false}>
          <span className="test" />
        </Loading>
      );
      expect(wrapper.find(".test")).toBeTruthy();
    });

    it("should render message", () => {
      const wrapper = mount(
        <Loading isLoading={true} message={<span className="test" />} />
      );
      expect(wrapper.find(".test")).toBeTruthy();
    });
  });
});
