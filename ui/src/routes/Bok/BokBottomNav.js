import React from "react";
import { Grid, Row, Col } from "components/Grid";
import Button from "features/Button";

export const BokBottomNav = ({current="", bokList}) => {
  const currentIndex = bokList.findIndex((b) => b.bokSectionId === current);
  const previous = bokList[currentIndex - 1];
  const next = bokList[currentIndex + 1];

  return (
    <Grid>
      <Row className="margin-bottom-2 bok-bottom-nav">
        <Col desktop="6" className="padding-bottom-2 desktop:padding-bottom-0">
          {!!previous ? <Button className="previous" to={`/bok/${previous.slug}`}>Previous</Button> : null}
        </Col>
        <Col size="6">
          {!!next ? <Button className="next" to={`/bok/${next.slug}`}>Next</Button> : null}
        </Col>
      </Row>
    </Grid>
  );
};
