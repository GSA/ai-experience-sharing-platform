import React from "react";
import { Route } from "react-router-dom";
import Taxonomy from "templates/Taxonomy";
import Usecase from "templates/Usecase";

const UsecaseComp = ({ match: { path } }) => {
  return <Route path={`/usecases/:name`} exact component={Usecase} />;
};

UsecaseComp.defaultProps = {
  match: {},
};

export default UsecaseComp;
