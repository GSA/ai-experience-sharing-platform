import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { page, getPage } from "app/contentSlice";
import Mdx from "features/Mdx";

const Homepage = () => {
  const dispatch = useDispatch();
  const name = "homepage";
  const { pending, data } = useSelector(page);
  useEffect(() => {
    dispatch(getPage({ type: "page", name }));
  }, [dispatch, name]);
  return <Mdx>{data.body}</Mdx>;
};

export default Homepage;
