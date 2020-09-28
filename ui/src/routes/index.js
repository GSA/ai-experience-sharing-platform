import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Page from "./Page";
import Library from "./Library";

export default ({ location }) => (
  <Switch location={location}>
    <Route key="homepage" path="/" component={Homepage} exact />
    <Route key="page" path="/:name" component={Page} exact />
    <Route key="library" path="/library" component={Library} />
  </Switch>
);
