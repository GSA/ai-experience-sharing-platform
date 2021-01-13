import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const Card = ({
  className,
  children,
  image,
  imageAlt,
  meta,
  subtitle,
  title,
  footer,
  variant,
  flat,
  color,
  ...props
}) => {
  return (
    <div
      className={classnames({
        "usa-card": true,
        "usa-card--flag": variant === "horizontal",
        "usa-card--no-media": !image,
        "usa-card--no-content": !title && !meta && !children,
        "usa-card--flat": flat,
        [className]: Boolean(className),
      })}
      {...props}
    >
      <div
        className={classnames({
          "usa-card__container": true,
          [`border-left-1 border-top-0 border-right-0 border-bottom-0 border-solid border-${color}`]: Boolean(
            color
          ),
        })}
      >
        {(title || meta || subtitle) && (
          <header className="usa-card__header">
            {title && <h2 className="usa-card__heading">{title}</h2>}
            {subtitle && <h3 className="usa-card__subhead">{subtitle}</h3>}
            {meta && <span className="usa-card__meta">{meta}</span>}
          </header>
        )}
        {image && (
          <div className="usa-card__media">
            <div className="usa-card__img">
              <div className="usa-card__img-container">
                <img src={image} alt={imageAlt} />
              </div>
            </div>
          </div>
        )}
        {children && <div className="usa-card__body">{children}</div>}
        {footer && <div className="usa-card__footer">{footer}</div>}
      </div>
    </div>
  );
};

Card.defaultProps = {
  variant: "vertical",
  imageAlt: "",
};

Card.propTypes = {
  /** classname to be applied to component */
  className: PropTypes.string,
  /** path to image */
  image: PropTypes.string,
  /** image alt description */
  imageAlt: PropTypes.string,
  /** meta text or node */
  meta: PropTypes.node,
  /** title text or node */
  title: PropTypes.node,
  /** subtitle text or node */
  subtitle: PropTypes.node,
  /** footer text or node */
  footer: PropTypes.node,
  /** render variant for card orientation */
  variant: PropTypes.oneOf(["vertical", "horizontal"]),
  /** boolean to display card shadow */
  flat: PropTypes.bool,
  /** child node */
  children: PropTypes.node,
  /** border color variant */
  color: PropTypes.string,
};

export default Card;
