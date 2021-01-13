import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "components/Grid";
import Button from "features/Button";
import Mdx from "features/Mdx";

const Callout = ({
  className,
  title,
  subtitle,
  text,
  items,
  button,
  variant,
}) => {
  return (
    <div
      className={classnames({
        TxCallout: true,
        [`TxCallout__${variant}`]: variant,
        [className]: Boolean(className),
      })}
    >
      {title && <h2>{title}</h2>}
      {text && <div className="margin-bottom-4">{text}</div>}
      {subtitle && <h3>{subtitle}</h3>}
      {items && (
        <Row className="TxCallout__items">
          {items.map((item, i) => (
            <Col
              key={`txCallout-${i}`}
              className={classnames({ [item.className]: item.className })}
              size="12"
              desktop="auto"
            >
              <div className="display-flex margin-right-2">
                <div
                  className={classnames({
                    TxCallout__icon: true,
                    [`TxCallout__icon--${variant}`]: variant,
                  })}
                />
                <div className="TxCallout__content">
                  <Mdx>{item.body}</Mdx>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
      {button.text && button.link && (
        <div className="text-center margin-top-2 margin-bottom-4">
          <Button variant="outline" url={button.link}>
            {button.text}
          </Button>
        </div>
      )}
    </div>
  );
};

Callout.defaultProps = {
  button: {},
  items: [],
  variant: "check",
};

Callout.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  text: PropTypes.node,
  button: PropTypes.object,
  items: PropTypes.array,
  variant: PropTypes.oneOf(["check", "none", "number", "ringer"]),
};

export default Callout;
