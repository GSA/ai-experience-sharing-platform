import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({ icon, variant, className }) => {
  const varMap = {
    solid: "fas",
    regular: "far",
  };
  return (
    <FontAwesomeIcon icon={[varMap[variant], icon]} className={className} />
  );
};

Icon.defaultProps = {
  variant: "solid",
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["regular", "solid"]),
  className: PropTypes.string,
};

export default Icon;
