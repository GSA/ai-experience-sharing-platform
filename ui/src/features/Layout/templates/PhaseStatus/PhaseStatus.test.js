import React from "react";
import { mount } from "enzyme";
import PhaseStatus from ".";
import TestProvider from "test/TestProvider";
import store from "app";
import runAsyncRender from "test/utils/runAsyncRender";

const data = {
  status: "1",
  phase: "4",
};

describe("PhaseStatus", () => {
  describe("default render", () => {
    it("should render project status", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <PhaseStatus data={data} />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper).toBeTruthy();
    });

    it("should render project status as graduated", async () => {
      const wrapper = mount(
        <TestProvider store={store}>
          <PhaseStatus
            phase="4"
            data={{
              ...data,
              status: "3",
            }}
          />
        </TestProvider>
      );
      await runAsyncRender(wrapper);
      expect(wrapper).toBeTruthy();
    });
  });
});
