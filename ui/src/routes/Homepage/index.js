import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPage } from "app/ContentModule";
import Mdx from "features/Mdx";
import { Loading } from "components/Loading";
import FourOhFour from "templates/FourOhFour";

const Homepage = ({ name }) => {
  const dispatch = useDispatch();
  const { pending, data, error } = useSelector((state) => state.content.page);
  useEffect(() => {
    dispatch(getPage({ type: "page", name }));
  }, [dispatch, name]);

  if (error) {
    return <FourOhFour />;
  }
  return (
    <Loading isLoading={pending}>
      <Mdx>{data.body}</Mdx>
    </Loading>
  );
};

Homepage.defaultProps = {
  name: "homepage",
};

export default Homepage;
