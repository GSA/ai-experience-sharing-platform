import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Library from "./Library";
import Page from "./Page";

export default ({ location }) => (
  <Switch location={location}>
    <Route key="homepage" path="/" component={Homepage} exact />
    <Route key="page" path="/:name" component={Page} exact />
    <Route key="usecase" path="/library" component={Library} />
  </Switch>
);
