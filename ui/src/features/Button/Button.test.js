import React from "react";
import { mount, render } from "enzyme";
import Button from "features/Button";
import Provider from "test/TestProvider";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

describe("<Button />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Provider>
          <Button url="http://google.com">Test</Button>
        </Provider>
      );
      expect(wrapper.find(".usa-button").length).toBeTruthy();
    });
  });

  it("should render <a>", async () => {
    const wrapper = render(
      <Provider>
        <Button url="http://google.com">Test</Button>
      </Provider>
    );
    expect(wrapper.find("a")).toBeTruthy();
  });

  it("should render <button>", async () => {
    const wrapper = render(
      <Provider>
        <Button onClick={() => null}>Test</Button>
      </Provider>
    );
    expect(wrapper.find("button")).toBeTruthy();
  });

  it("should render <Link>", async () => {
    const wrapper = render(
      <Provider>
        <Button url="/test">Test</Button>
      </Provider>
    );
    expect(wrapper.find("a")).toBeTruthy();
  });
});
