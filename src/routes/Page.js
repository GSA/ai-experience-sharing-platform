import React from "react";
import { Route } from "react-router-dom";
import Layout from "templates/Page";

const Page = () => (
  <Route path="/:page" exact>
    <Layout />
  </Route>
);

export default Page;
