import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "components/Grid";
import Icon from "components/Icon";

const List = ({ className, title, subtitle, text, items, button, columns }) => {
  const desktop = {
    1: "12",
    2: "6",
    3: "4",
  };
  return (
    <div
      className={classnames({
        USList: true,
        [className]: Boolean(className),
      })}
    >
      {items && (
        <Row gap="6">
          {items.map((item, i) => (
            <Col key={`USLinks-${i}`} size="12" desktop={desktop[columns]}>
              <div className="display-flex">
                <Icon
                  icon="circle"
                  size="xs"
                  className="margin-right-2 margin-top-1 text-accent-warm"
                />
                <div>
                  <b className="margin-right-2px">{item.title}</b>
                  <span>{item.text}</span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

List.defaultProps = {
  button: {},
  items: [],
  columns: "2",
};

List.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  subtitle: PropTypes.node,
  text: PropTypes.node,
  button: PropTypes.object,
  items: PropTypes.array,
  columns: PropTypes.oneOf(["1", "2", "3"]),
};

export default List;
