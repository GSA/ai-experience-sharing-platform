import React from "react";
import { Switch, Route } from "react-router-dom";
import Default from "./Default";
import Page from "./Page";
import AdminLogin from "./AdminLogin";
import Usecase from "templates/Usecase";

export default ({ location }) => (
  <Switch>
    <Route key="page" path="/loginadmin" exact>
      <AdminLogin />
    </Route>
    <Route path="/usecases/:slug">
      <Usecase />
    </Route>

    <Route key="page" path="/:slug">
      <Page />
    </Route>
    <Route key="default" path="/" exact>
      <Default />
    </Route>
  </Switch>
);
