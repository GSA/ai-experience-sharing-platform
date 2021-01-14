import React from "react";
import PropTypes from "prop-types";

const Logo = ({ title, variant }) => {
  return (
    <span className="usa-logo" id="basic-logo">
      {`AI in Government`}
    </span>
  );
};

Logo.defaultProps = {
  variant: 1,
};

Logo.propTypes = {
  title: PropTypes.node,
};

export default Logo;
