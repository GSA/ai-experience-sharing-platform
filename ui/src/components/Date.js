import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Date = ({ format, children }) => {
  return <Moment format={format}>{children}</Moment>;
};

Date.defaultProps = {
  format: "MMMM D, YYYY",
};

Date.propTypes = {
  format: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]),
};

export default Date;
