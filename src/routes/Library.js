import React from "react";
import { Switch, Route } from "react-router-dom";
import Taxonomy from "./Taxonomy";
import Article from "./Article";

export default () => (
  <Switch>
    <Route path="/:type" component={Taxonomy} exact />
    <Route path="/:type/:name" component={Article} exact />{" "}
  </Switch>
);
