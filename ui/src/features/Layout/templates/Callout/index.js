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
        USCallout: true,
        [`USCallout__${variant}`]: variant,
        [className]: Boolean(className),
      })}
    >
      {items && (
        <Row className="USCallout__items">
          {items.map((item, i) => (
            <Col
              key={`USCallout-${i}`}
              className={classnames({ [item.className]: item.className })}
              size="12"
              desktop="auto"
            >
              <div className="display-flex margin-right-2">
                <div
                  className={classnames({
                    USCallout__icon: true,
                    [`USCallout__icon--${variant}`]: variant,
                  })}
                />
                <div className="USCallout__content">
                  <Mdx>{item.body}</Mdx>
                </div>
              </div>
            </Col>
          ))}
        </Row>
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
