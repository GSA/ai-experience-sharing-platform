import React from "react";
import { Route } from "react-router-dom";
import Taxonomy from "templates/Taxonomy";
import Article from "templates/Article";

const Library = ({ match: { path } }) => {
  return (
    <>
      <Route path={`${path}/:type`} exact component={Taxonomy} />
      <Route path={`${path}/:type/:name`} exact component={Article} />
    </>
  );
};

Library.defaultProps = {
  match: {},
};

export default Library;
