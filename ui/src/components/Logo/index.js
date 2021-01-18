import React from "react";
import PropTypes from "prop-types";

const Logo = ({ title }) => {
  return (
    <span className="usa-logo" id="basic-logo">
      {title}
    </span>
  );
};

Logo.propTypes = {
  title: PropTypes.node.isRequired,
};

export default Logo;
