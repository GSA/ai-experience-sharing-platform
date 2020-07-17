import React, { useEffect } from "react";
import { siteData } from "app/siteSlice";
import Layout from "templates/Layout";
import routes from "routes";
import "styles/index.scss";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(siteData());
  });
  return <Layout>{routes}</Layout>;
}

export default App;
