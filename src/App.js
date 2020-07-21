import React, { useEffect } from "react";
import { siteData } from "app/siteSlice";
import Layout from "templates/Layout";
import Routes from "routes";
import "styles/index.scss";
import { useDispatch } from "react-redux";
import { getMenus } from "app/siteSlice/context";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(siteData());
    dispatch(getMenus());
  });
  return (
    <Layout>
      <Routes />
    </Layout>
  );
}

export default App;
