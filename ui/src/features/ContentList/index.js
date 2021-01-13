import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getList } from "app/ContentModule";
import Loading from "components/Loading";

const ContentList = ({ type, render, error: errorRender }) => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.content.list);
  useEffect(() => {
    dispatch(getList({ type }));
  }, [dispatch, type]);

  const { pending, data, error } = list;

  const Error = errorRender;
  const Comp = render;

  if (pending) {
    return <Loading isLoading={pending} />;
  }
  if (error) {
    return Error ? (
      <Error data={error} />
    ) : (
      <h1 className="ContentList__error">{error.message}</h1>
    );
  }
  if (!data.length) {
    return <h1>No content found.</h1>;
  }
  return data.map((item, i) =>
    Comp ? (
      <Comp key={`ContentList__${type}-${i}`} data={item} />
    ) : (
      <h1 className="ContentList__item" key={`ContentList__${type}-${i}`}>
        {item.title}
      </h1>
    )
  );
};

ContentList.defaultProps = {
  type: "page",
};

ContentList.propTypes = {
  type: PropTypes.string,
};

export default ContentList;
