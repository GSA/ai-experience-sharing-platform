import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { page, getPage, clearPage } from "app/contentSlice";
import Mdx from "features/Mdx";

const Homepage = () => {
  const dispatch = useDispatch();
  const name = "homepage";
  const { data } = useSelector(page);
  useEffect(() => {
    dispatch(getPage({ type: "page", name }));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, name]);
  return <Mdx>{data.body}</Mdx>;
};

export default Homepage;
