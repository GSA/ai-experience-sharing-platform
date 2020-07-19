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
        [`grid-col-${size}`]: size,
        [`tablet:grid-col-${tablet}`]: tablet,
        [`desktop:grid-col-${desktop}`]: desktop,
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
  size: "12",
};

const colSizes = computeSizes();

Col.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  size: PropTypes.oneOf(colSizes),
  tablet: PropTypes.oneOf(colSizes),
  desktop: PropTypes.oneOf(colSizes),
};
