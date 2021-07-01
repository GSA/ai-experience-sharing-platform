import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";
const Default = lazy(() => import("./Default"));
const Page = lazy(() => import("./Page"));
const AdminLogin = lazy(() => import("./AdminLogin"));
const Usecase = lazy(() => import("./Usecase"));
const Bok = lazy(() => import("./Bok"));

export default ({ location }) => (
  <Switch>
    <Suspense fallback={<div>Loading...</div>}>
      <Route key="page" path="/loginadmin" exact>
        <AdminLogin />
      </Route>
      <Route path="/bok/:slug">
        <Bok />
      </Route>
      <Route path="/bok" exact>
        <Page slug="bok" />
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
    </Suspense>
  </Switch>
);
