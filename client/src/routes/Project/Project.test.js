import React from "react";
import { mount } from "enzyme";
import Project from "./index";
import TestProvider from "test/TestProvider";
import store from "app";
import runAsyncRender from "test/utils/runAsyncRender";
import { Route } from "react-router-dom";
import Links from "./Links";
import Team from "./Team";

describe("Project", () => {
  describe("default render", () => {
    it("should render", async () => {
      const wrapper = mount(
        <TestProvider store={store} route={["/projects/test"]}>
          <Route path="/projects/:name" component={Project} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find("h1").first().text()).toBe(
        "What if we could create an easy federated data aggregation for better analysis & insights?"
      );
    });
    it("should render error on incorrect path name", async () => {
      const wrapper = mount(
        <TestProvider store={store} route={["/projects/error"]}>
          <Route path="/projects/:name" component={Project} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper.find(".Tx__FourOhFour").length).toBe(1);
    });
  });
});

const links = [
  { link: "/1", text: "test1" },
  { link: "/1", text: "test2" },
];

describe("Links", () => {
  it("should render", async () => {
    const wrapper = mount(
      <TestProvider store={store} route={["/projects/test"]}>
        <Links data={links} />
      </TestProvider>
    );
    await runAsyncRender(wrapper);
    expect(wrapper.find(".TxLinks__item").length).toBe(2);
  });
});

const team = {
  submitter: "test1",
  members: "test2",
};

describe("Team", () => {
  it("should render", async () => {
    const wrapper = mount(<Team data={team} />);
    await runAsyncRender(wrapper);
    expect(wrapper.find(".TxTeam__submitter").text()).toBe(
      "Idea submitter:  test1"
    );

    expect(wrapper.find(".TxTeam__members").text()).toBe("Team:  test2");
  });
});
