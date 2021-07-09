import React from "react";
import { mount, render } from "enzyme";
import Link from "features/Link";
import Provider from "test/TestProvider";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe("<Link />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Provider>
          <Link url="http://google.com">Test</Link>
        </Provider>
      );
      expect(wrapper.find("a").length).toBeTruthy();
    });
  });

  it("should render <a>", async () => {
    const wrapper = render(
      <Provider>
        <Link url="http://google.com">Test</Link>
      </Provider>
    );
    expect(wrapper.find("a")).toBeTruthy();
  });

  it("should render <Link>", async () => {
    const wrapper = render(
      <Provider>
        <Link url="/test">Test</Link>
      </Provider>
    );
    expect(wrapper.find("a")).toBeTruthy();
  });
});
