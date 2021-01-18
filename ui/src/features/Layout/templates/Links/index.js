import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "components/Grid";
import Link from "features/Link";
import Icon from "components/Icon";

const Links = ({ className, title, subtitle, text, items, button }) => {
  return (
    <div
      className={classnames({
        USLayout__links: true,
        [className]: Boolean(className),
      })}
    >
      {items && (
        <Row gap="6">
          {items.map((item, i) => (
            <Col key={`USLinks-${i}`} size="12" desktop="6">
              <div className="display-flex margin-bottom-4">
                <Icon
                  icon="circle"
                  size="xs"
                  className="margin-right-2 text-accent-warm"
                />
                <Link url={item.link}>{item.text}</Link>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

Links.defaultProps = {
  button: {},
  items: [],
};

Links.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  text: PropTypes.node,
  button: PropTypes.object,
  items: PropTypes.array,
};

export default Links;
