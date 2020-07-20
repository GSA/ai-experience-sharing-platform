import React from "react";
import { Switch, Route } from "react-router-dom";
import Homepage from "./Homepage";
import Page from "./Page";
import Library from "./Library";

export default () => (
  <Switch>
    <Route path="/" component={Homepage} exact />
    <Route path="/:name" component={Page} exact />
    <Route path="/library" component={Library} />
  </Switch>
);
