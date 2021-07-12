import React from "react";
import { mount } from "enzyme";
import Sidebar from "./Sidebar";
import Provider from "test/TestProvider";
import store from "app";
import { setSearchTerm } from "app/ContentModule";
import { login } from "app/AuthModule";
import { act } from 'react-dom/test-utils';

describe("<Sidebar />", () => {
  describe("default render", () => {
    it("should render", async () => {
      await store.dispatch(login({ token: "test" }));
      jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve({
        json: () => Promise.resolve([{
          suggestions: [
            { text: 'one', url: '/one' },
            { text: 'two' },
          ]
        }])
      }));

      const wrapper = mount(
        <Provider>
          <Sidebar />
        </Provider>
      );

      await act(async () => {
        await store.dispatch(setSearchTerm('test'));
      });
    });
  });
});
