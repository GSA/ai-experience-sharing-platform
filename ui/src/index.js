import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Routes from "routes";
import store from "app";
import registerFontAwesome from "utils/registerFontAwesome";
import Layout from "templates/Primary";
import "./styles/index.scss";

import * as serviceWorker from "./serviceWorker";

const basename = process.env.PUBLIC_URL || "/";

registerFontAwesome();

ReactDOM.render(
  <React.StrictMode>
    <Router basename={basename}>
      <Provider store={store}>
        <Layout>
          <Routes />
        </Layout>
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
