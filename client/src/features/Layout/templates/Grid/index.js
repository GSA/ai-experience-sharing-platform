import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Col, Row } from "components/Grid";
import Mdx from "features/Mdx";

const Grid = ({ className, columns }) => {
  return (
    <Row className={classnames({ TxGrid: true, [`${className}`]: className })}>
      {columns.length &&
        columns.map((col, i) => (
          <Col className={col.className} size={col.size} desktop={col.desktop}>
            <Mdx>{col.body}</Mdx>
          </Col>
        ))}
    </Row>
  );
};

const sizeEnum = [
  "auto",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
];

Grid.defaultProps = {
  columns: [],
};

Grid.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.shape({
    className: PropTypes.string,
    size: PropTypes.oneOf(sizeEnum),
    desktop: PropTypes.oneOf(sizeEnum),
    content: PropTypes.array,
  }),
};

export default Grid;
