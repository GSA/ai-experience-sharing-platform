import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Layout from "templates/layouts/primary";
import Login from "templates/Login";
import { Taxonomy } from "templates/layouts/taxonomy";
import { Article } from "templates/layouts/article";

const IndexPage = (props) => {
  return (
    <Router basename="/library">
      <Route path="/" exact>
        <h1>Logged In</h1>
      </Route>
      <Route path="/use-case" exact>
        <Taxonomy
          pageContext={{
            type: "use-case",
            dataKey: "usecase",
          }}
        />
      </Route>
      <Route path="/use-case/:name" exact strict>
        <Article
          pageContext={{
            type: "use-case",
            dataKey: "usecase",
          }}
        />
      </Route>
    </Router>
  );
};

export default IndexPage;
