import React from "react";
import { act } from 'react-dom/test-utils';
import { mount } from "enzyme";
import Mdx from "features/Mdx";

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

describe("<Mdx />", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(<Mdx>{"# Test"}</Mdx>);
      await waitForComponentToPaint(wrapper);
      expect(wrapper.text()).toBe("Test");
      expect(wrapper.find("h1").length).toBe(1);
    });
  });
});
