import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const Break = ({ color, variant }) => {
  return (
    <div
      className={classnames({
        USBreak: true,
        [`USBreak__${color}`]: color,
        USBreak__wide: variant === "wide",
      })}
    />
  );
};

Break.defaultProps = {
  color: "primary-lighter",
};

Break.propTypes = {
  color: PropTypes.oneOf([
    "primary-lighter",
    "secondary",
    "accent-warm",
    "accent-cool",
    "base-lighter",
  ]),
};

export default Break;
