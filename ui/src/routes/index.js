import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
const Default = lazy(() => import("./Default"));
const Page = lazy(() => import("./Page"));
const AdminLogin = lazy(() => import("./AdminLogin"));
const Usecase = lazy(() => import("./Usecase"));

export default ({ location }) => (
  <Suspense fallback={<div>Loading...</div>}>
    <Switch>
      <Route path="/loginadmin" exact>
        <AdminLogin />
      </Route>
      <Route path="/usecases/:slug">
        <Usecase />
      </Route>
      <Route path="/:slug">
        <Page />
      </Route>
      <Route key="default" path="/" exact>
        <Default />
      </Route>
    </Switch>
  </Suspense>
);
