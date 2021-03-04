import React from "react";
import PropTypes from "prop-types";

const RDate = ({ format, children }) => {
  try {
    return <span>{new Intl.DateTimeFormat('en-US', {dateStyle: format}).format(Date.parse(children))}</span>;
  } catch (e) {
    return null;
  }
};

Date.defaultProps = {
  format: "long",
};

Date.propTypes = {
  format: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Date),
    PropTypes.number,
  ]),
};

export default RDate;
