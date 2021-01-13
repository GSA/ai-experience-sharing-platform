import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import defaultStore from "app";
import registerFontAwesome from "utils/registerFontAwesome";

export default ({ children, store: passedStore, route = ["/"], index = 0 }) => {
  registerFontAwesome();
  const store = passedStore ? passedStore : defaultStore;
  return (
    <Provider store={store}>
      <Router initialEntries={route} initialIndex={index}>
        {children}
      </Router>
    </Provider>
  );
};
