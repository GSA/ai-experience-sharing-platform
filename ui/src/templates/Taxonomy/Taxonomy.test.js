import React from "react";
import { mount } from "enzyme";
import Taxonomy from "templates/Taxonomy";
import TestProvider from "test/TestProvider";
import store from "app";
import { login } from "app/AuthModule";
import { Route } from "react-router-dom";
import runAsyncRender from "test/utils/runAsyncRender";
import { getTaxonomy } from "app/ContentModule";

const creds = { token: "test" };

describe("<Taxonomy />", () => {
  describe("default render", () => {
    it("should render", () => {
      const wrapper = mount(
        <TestProvider>
          <Taxonomy />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });

    it("should render authenticated", async () => {
      await store.dispatch(login(creds));
      const wrapper = mount(
        <TestProvider>
          <Taxonomy />
        </TestProvider>
      );
      expect(wrapper.find(".App-header")).toBeTruthy();
    });

    it("should render error", async () => {
      await store.dispatch(login(creds));
      const wrapper = mount(
        <TestProvider route={["/error"]}>
          <Route path="/:type">
            <Taxonomy />
          </Route>
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find(".FourOhFour__title").hostNodes().length).toBe(1);
    });
  });

  describe("features", () => {
    it("should change layout", async () => {
      await store.dispatch(login(creds));
      const wrapper = mount(
        <TestProvider route={["/usecase"]}>
          <Route path="/:type" component={Taxonomy} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      wrapper.find("button#Layout__toggle-card").first().simulate("click");
      await runAsyncRender(wrapper);
      expect(
        wrapper.find("button#Layout__toggle-list.usa-button--primary-outline")
          .length
      ).toBe(1);
    });
  });
});
