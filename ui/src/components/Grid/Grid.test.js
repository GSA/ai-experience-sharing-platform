import React from "react";
import { mount } from "enzyme";
import { Grid, Row, Col } from "components/Grid";

describe("<Grid />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Grid>
          <span className="test" />
        </Grid>
      );
      expect(wrapper.find(".grid-container")).toBeTruthy();
      expect(wrapper.find(".test")).toBeTruthy();
    });
  });
});

describe("<Row />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Row>
          <span className="test" />
        </Row>
      );
      expect(wrapper.find(".grid-col-12")).toBeTruthy();
      expect(wrapper.find(".test")).toBeTruthy();
    });
  });
});

describe("<Col />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <Col>
          <span className="test" />
        </Col>
      );
      expect(wrapper.find(".grid-container")).toBeTruthy();
    });
  });
});
