import React from 'react';
import PropTypes from 'prop-types';

const validVar = (variant) => ['horizontal', 'vertical'].includes(variant);

const Card = ({
  className,
  image,
  imageAlt,
  meta,
  title,
  excerpt,
  footer,
  variant: userVar,
  flat,
}) => {
  let trueVar = 'vertical';
  if (validVar(userVar)) {
    trueVar = userVar;
  } else {
    console.warn(`<Card /> : ${userVar} is not a valid variant.`);
  }

  return (
    <div
      className={`usa-card ${
        trueVar === 'horizontal' ? 'usa-card--flag' : ''
      } ${!image ? 'usa-card--no-media' : ''} ${
        !title && !meta && !excerpt ? 'usa-card--no-content' : ''
      } ${flat ? 'usa-card--flat' : ''} ${className}`}
    >
      <div className="usa-card__container">
        {(title || meta) && (
          <header className="usa-card__header">
            <span className="usa-card__meta">{meta}</span>
            <h3 className="usa-card__heading">{title}</h3>
          </header>
        )}
        {image && (
          <div className="usa-card__media">
            <div className="usa-card__img">
              <div
                className={`usa-card__img-container`}
                style={{ backgroundImage: `url('${image}')` }}
              >
                <img src={image} alt={imageAlt} />
              </div>
            </div>
          </div>
        )}
        {excerpt && <div className="usa-card__body">{excerpt}</div>}
        {footer && <div className="usa-card__footer">{footer}</div>}
      </div>
    </div>
  );
};

Card.defaultProps = {
  variant: 'vertical',
  imageAlt: '',
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
  /** excerpt text or node */
  excerpt: PropTypes.node,
  /** footer text or node */
  footer: PropTypes.node,
  /** render variant for card orientation */
  variant: PropTypes.oneOf(['vertical', 'horizontal']),
  /** boolean to display card shadow */
  flat: PropTypes.bool,
};

export default Card;
