import React, { useEffect } from "react";
import { siteData, getMenus } from "app/siteSlice";
import Layout from "templates/Layout";
import Routes from "routes";
import "styles/index.scss";
import { useDispatch } from "react-redux";

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
