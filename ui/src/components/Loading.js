import React from "react";
import { Grid, Row, Col } from "./Grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Loading = ({ isLoading, children }) => {
  if (isLoading) {
    return (
      <Grid>
        <Row className="padding-y-8 text-center">
          <Col size={12} className="padding-y-8">
            <h1>
              <FontAwesomeIcon icon="spinner" spin /> LOADING...
            </h1>
          </Col>
        </Row>
      </Grid>
    );
  }
  return children;
};
