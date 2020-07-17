import React from "react";
import { Route } from "react-router-dom";
import Layout from "templates/Taxonomy";

const Taxonomy = (props) => {
  return (
    <Route path="/library/:type">
      <h1>Library</h1>
      <Layout />
    </Route>
  );
};

export default Taxonomy;
