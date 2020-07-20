import React from "react";
import { Route } from "react-router-dom";
import Taxonomy from "./Taxonomy";
import Article from "./Article";

export default ({ match: { path } }) => {
  return (
    <>
      <Route path={`${path}/:type`} exact component={Taxonomy} />
      <Route path={`${path}/:type/:name`} exact component={Article} />
    </>
  );
};
