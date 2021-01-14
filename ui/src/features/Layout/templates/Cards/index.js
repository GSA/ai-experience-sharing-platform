import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "components/Grid";
import Card from "components/Card";
import Mdx from "features/Mdx";

const Cards = ({ title, text, cardItem: items, className, columns }) => {
  const columnSize = {
    one: "12",
    two: "6",
    three: "4",
    four: "3",
  };
  console.log(items);
  return (
    <div
      className={classnames({
        USCards: true,
        [className]: Boolean(className),
      })}
    >
      {title && <h2>{title}</h2>}
      {text && <div className="margin-bottom-4">{text}</div>}

      <Row className="flex-align-stretch">
        {items.map((item, i) => {
          return (
            <Col
              key={`USCards-${i}`}
              className={classnames({ [item.className]: item.className })}
              size="12"
              desktop={columnSize[columns]}
            >
              <Card>
                <Mdx>{item.body}</Mdx>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

Cards.defaultProps = {
  columns: "2",
  items: [],
};

Cards.propTypes = {
  title: PropTypes.node,
  text: PropTypes.node,
  className: PropTypes.node,
  items: PropTypes.array,
};

export default Cards;
