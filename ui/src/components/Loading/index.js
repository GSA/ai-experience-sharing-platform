import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

export const Loading = ({ className }) => {
  return (
    <div
      className={classnames({
        Loading: true,
        [className]: Boolean(className),
      })}
    />
  );
};

Loading.propTypes = {
  isLoading: PropTypes.bool,
  message: PropTypes.node,
  children: PropTypes.node,
};

export default Loading;
