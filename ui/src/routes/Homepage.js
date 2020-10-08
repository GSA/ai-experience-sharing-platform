import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPage, clearPage } from "app/contentSlice";
import Mdx from "features/Mdx";
import { Loading } from "components/Loading";

const Homepage = () => {
  const dispatch = useDispatch();
  const name = "homepage";
  const { pending, data } = useSelector((state) => state.content.page);
  useEffect(() => {
    dispatch(getPage({ type: "page", name }));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, name]);
  return (
    <Loading isLoading={pending}>
      <Mdx>{data.body}</Mdx>
    </Loading>
  );
};

export default Homepage;
