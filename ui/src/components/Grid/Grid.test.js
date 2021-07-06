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
    it("should render", () => {
      const wrapper = mount(
        <Grid size={"auto"} desktop={"auto"} tablet={"auto"} data-extra="one">
          <span className="test" />
        </Grid>
      );
      expect(wrapper.find(".grid-container")).toBeTruthy();
      expect(wrapper.find(".test")).toBeTruthy();
    });
    it("should render for tablet", () => {
      const wrapper = mount(
        <Grid tablet={2} size={2} desktop={2} offset={2} className="more-class">
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
