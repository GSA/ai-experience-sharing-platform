import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import Carousel from "features/Carousel";

describe("<Carousel />", () => {
  describe("default render", () => {
    it("should render", () => {
      const images = [
        { text: 'text', imageUrl: 'imageUrl', linkUrl: 'linkUrk' },
        { text: 'two text', imageUrl: 'twoimageUrl', linkUrl: 'twolinkUrk' },
        { text: 'three text', imageUrl: 'threeimageUrl', linkUrl: '' }
      ];
      const wrapper = mount(
        <Router>
          <Switch>
            <Carousel images={images} />
          </Switch>
        </Router>
      );
      expect(wrapper.find("img").length).toBe(3);
    });
  });
});
