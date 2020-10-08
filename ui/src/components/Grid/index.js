import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const computeSizes = (amount = 12) =>
  Array.from(Array(amount).keys()).reduce((acc, cur) => {
    const value = ++cur;
    const string = value.toString();
    return [...acc, value, string];
  }, []);

export const Grid = ({ className, children, ...props }) => {
  return (
    <div
      className={classnames({
        "grid-container": true,
        [className]: className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

Grid.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export const Row = ({ className, gap, children, ...props }) => {
  return (
    <div
      className={classnames({
        "grid-row": true,
        [`grid-gap-${gap}`]: gap,
        [className]: className,
      })}
      {...props}
    >
      {children}
    </div>
  );
};

const rowSizes = computeSizes(6);

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  gap: PropTypes.oneOf(rowSizes),
};

export const Col = ({
  className,
  size,
  tablet,
  desktop,
  offset,
  children,
  ...props
}) => {
  return (
    <div
      className={classnames({
        [`grid-col`]: size === "auto",
        [`grid-col-${size}`]: size && size !== "auto",
        [`tablet:grid-col-${tablet}`]: tablet && tablet !== "auto",
        [`tablet:grid-col`]: tablet === "auto",
        [`desktop:grid-col-${desktop}`]: desktop && desktop !== "auto",
        [`desktop:grid-col`]: desktop === "auto",
        [className]: className,
        [`grid-offset-${offset}`]: offset,
      })}
      {...props}
    >
      {children}
    </div>
  );
};
Col.defaultProps = {
  size: "auto",
};
const computedSizes = computeSizes();
const colSizes = [...computedSizes, "auto"];
Col.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(colSizes),
  tablet: PropTypes.oneOf(colSizes),
  desktop: PropTypes.oneOf(colSizes),
};
