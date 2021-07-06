import React from "react";
import { mount } from "enzyme";
import { Route } from "react-router-dom";
import { act } from 'react-dom/test-utils';
import Usecase from "routes/Usecase";
import TestProvider from "test/TestProvider";
import store from "app";
import { login } from "app/AuthModule";
import { getUsecaseSettings } from "app/SiteModule";
import runAsyncRender from "test/utils/runAsyncRender";

jest.mock('react', () => {
  const React = jest.requireActual('react');
  const Suspense = ({ children }) => {
    return children;
  };

  const lazy = jest.fn().mockImplementation((fn) => {
    const Component = (props) => {
      const [C, setC] = React.useState();

      React.useEffect(() => {
        fn().then(v => {
          setC(v)
        });
      }, []);

      return C ? <C.default {...props} /> : null;
    }

    return Component;
  })

  return {
    ...React,
    lazy,
    Suspense
  };
});

const waitForComponentToPaint = async (wrapper) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve));
    wrapper.update();
  });
};

describe("<Usecase />", () => {
  describe("default render", () => {
    window.scrollTo = jest.fn();
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Usecase />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });
  });
  describe("load content when authenticated", () => {
    it("should render", async () => {
      window.scrollTo = jest.fn();
      await store.dispatch(login({ token: "test" }));
      await store.dispatch(getUsecaseSettings());
      const wrapper = mount(
        <TestProvider route={["/usecases/test"]}>
          <Route path="/usecases/:slug">
            <Usecase />
          </Route>
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      await waitForComponentToPaint(wrapper);
      expect(wrapper.find("#business-problem").text()).toBe('Business Problem');
    });
  });
});
