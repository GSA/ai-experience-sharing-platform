import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Alert = ({ title, className, variant, slim, icon, children }) => {
  return (
    <div
      className={classnames({
        "usa-alert": true,
        [`usa-alert--${variant}`]: variant,
        "usa-alert--slim": slim,
        "usa-alert--no-icon": !icon,
        [className]: className,
      })}
      role="alert"
    >
      <div className="usa-alert__body">
        {title && <h3 className="usa-alert__heading">{title}</h3>}
        {children && <p className="usa-alert__text">{children}</p>}
      </div>
    </div>
  );
};

Alert.defaultProps = {
  className: "",
  variant: "info",
  slim: false,
  icon: true,
};

Alert.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  varaint: PropTypes.oneOf(["info", "warning", "error", "success"]),
  slim: PropTypes.bool,
  icon: PropTypes.bool,
};

export default Alert;
