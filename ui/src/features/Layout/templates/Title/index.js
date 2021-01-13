import React from "react";
import PropTypes from "prop-types";

const Title = ({ className, title, subtitle }) => {
  return (
    <div className={className}>
      {title && <h1>{title}</h1>}
      {subtitle && <blockquote>{subtitle}</blockquote>}
    </div>
  );
};

Title.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Title;
