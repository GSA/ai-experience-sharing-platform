import React from "react";
import { Route } from "react-router-dom";
import Taxonomy from "routes/Taxonomy";
import Article from "routes/Article";

export default ({ match: { path } }) => {
  return (
    <>
      <Route path={`${path}/:type`} exact component={Taxonomy} />
      <Route path={`${path}/:type/:name`} exact component={Article} />
    </>
  );
};
