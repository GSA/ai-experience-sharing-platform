import React from "react";
import ReactDOM, { hydrate, render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./routes";
import store from "./app";
import * as serviceWorker from "./serviceWorker";
import Primary from "templates/Primary";
import registerFontAwesome from "utils/registerFontAwesome";
import "styles/index.scss";

registerFontAwesome();

if (process.env.NODE_ENV !== "production") {
  const axe = require("react-axe");
  axe(React, ReactDOM, 1000);
}

const App = () => (
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <Primary>
          <Routes />
        </Primary>
      </Provider>
    </Router>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement);
} else {
  render(<App />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
