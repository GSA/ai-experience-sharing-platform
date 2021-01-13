import React from "react";
import {
  AnimatedRoutes as Switch,
  RouteTransition as Route,
} from "./AnimatedRoutes";
import Default from "./Default";
import Page from "./Page";

export default ({ location }) => (
  <Switch>
    <Route key="default" path="/" exact>
      <Default />
    </Route>
    <Route key="page" path="/:name">
      <Page />
    </Route>
  </Switch>
);
