import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Layout from "templates/Layout";
import { getPage, page } from "app/contentSlice";
import "styles/index.scss";

function App() {
  const dispatch = useDispatch();
  const { pathname } = useParams;
  const { data = {}, pending } = useSelector(page);
  console.log(data);
  useEffect(() => {
    dispatch(getPage("about"));
  }, [dispatch, pathname]);
  return (
    <Layout>
      <h1>{pending ? "LOADING" : data.name}</h1>
    </Layout>
  );
}

export default App;
