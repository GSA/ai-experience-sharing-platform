import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";

import Layout from "templates/Primary";
import Routes from "routes";
import store from "app";
import { Provider } from "react-redux";

import { library } from "@fortawesome/fontawesome-svg-core";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import * as serviceWorker from "./serviceWorker";
library.add(fas, far);
const basename = process.env.PUBLIC_URL || "/";
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
