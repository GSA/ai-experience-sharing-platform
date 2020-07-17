import React from "react";
import { Route } from "react-router-dom";
import Layout from "templates/Taxonomy";

const Taxonomy = (props) => {
  return (
    <Route path="/library/:type">
      <Layout />
    </Route>
  );
};

export default Taxonomy;
