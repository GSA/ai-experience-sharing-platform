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
      expect(wrapper.find(".grid-col").hostNodes().length).toBe(1);
      expect(wrapper.find(".test").hostNodes().length).toBe(1);
    });
    it("should render tablet and desktop", () => {
      const wrapper = mount(
        <Col tablet="3" desktop="5">
          <span className="test" />
        </Col>
      );
      expect(wrapper.find("div").hasClass("tablet:grid-col-3")).toBeTruthy();
      expect(wrapper.find("div").hasClass("desktop:grid-col-5")).toBeTruthy();
      expect(wrapper.find(".test").hostNodes().length).toBe(1);
    });
  });
});
