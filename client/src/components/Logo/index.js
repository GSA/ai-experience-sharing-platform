import React from "react";
import PropTypes from "prop-types";
import One from "./logo1.svg";
import Two from "./logo2.svg";
import Three from "./logo3.svg";

const logos = [One, Two, Three];

const Logo = ({ title, variant }) => {
  return (
    <div className="usa-logo" id="basic-logo">
      <img src={logos[variant - 1]} alt="10x Logo" />
    </div>
  );
};

Logo.defaultProps = {
  variant: 1,
};

Logo.propTypes = {
  title: PropTypes.node,
};

export default Logo;
