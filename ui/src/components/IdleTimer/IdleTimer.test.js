import React from "react";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mount } from "enzyme";
import IdleTimer from "components/IdleTimer";
import * as reactRedux from 'react-redux'
import * as reactRouterDom from "react-router-dom";
import * as authModule from 'app/AuthModule'
import { useIdleTimer } from 'react-idle-timer';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('react-idle-timer', () => ({ useIdleTimer: jest.fn() }));

jest.useFakeTimers();

describe("<IdleTimer />", () => {
  describe("default render", () => {
    it("should render", () => {
      const store = createStore(() => [], {});
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ isAuth: true });

      const wrapper = mount(
        <Provider store={store}>
          <IdleTimer />
        </Provider>
      );
      expect(wrapper.html()).toBe('');
    });
  });
  describe("idle timeout", () => {
    it("should log out user", () => {
      const store = createStore(() => [], {});
      const dispatchMock = jest.fn();
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ isAuth: true });
      const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchMock);

      const wrapper = mount(
        <Provider store={store}>
          <IdleTimer />
        </Provider>
      );
      jest.advanceTimersByTime(1000 * 60 * 20);
      jest.clearAllTimers();
      expect(useIdleTimer).toHaveBeenCalled();
      useIdleTimer.mock.calls[0][0].onIdle();
      expect(dispatchMock).toHaveBeenCalled();
    });
    it("should not change the url if no one is logged in", () => {
      const store = createStore(() => [], {});
      const dispatchMock = jest.fn();
      const useSelectorMock = jest.spyOn(reactRedux, 'useSelector').mockReturnValue({ isAuth: false });
      const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(dispatchMock);

      const wrapper = mount(
        <Provider store={store}>
          <IdleTimer />
        </Provider>
      );
      jest.advanceTimersByTime(1000 * 60 * 20);
      jest.clearAllTimers();
      expect(useIdleTimer).toHaveBeenCalled();
      useIdleTimer.mock.calls[0][0].onIdle();
      expect(dispatchMock).toHaveBeenCalled();
    });
  });
});
