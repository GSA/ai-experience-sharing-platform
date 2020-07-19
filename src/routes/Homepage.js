import React from "react";
import { Route } from "react-router-dom";
import Button from "components/Button";
import Card from "components/Card";
import { Row, Grid, Col } from "components/Grid";

const Homepage = () => {
  const data = [];

  return (
    <Route path="/" exact>
      <Grid className="grid-container">
        <Row className="grid-row use-case-header">
          <Col className="grid-col-6 use-case-header__title">
            Featured Use Cases
          </Col>
          <Col className="grid-col-6 use-case-header__link">
            <Button url="/library/usecase" variant="link">
              View All Use Cases
            </Button>
          </Col>
        </Row>

        <Row gap={6} className="padding-x-8">
          {data.map((item) => (
            <Col key={item.name} size={6} className="padding-bottom-4">
              <Card
                className="MockCard"
                title={item.title}
                excerpt={item.excerpt}
                footer={
                  <Button url={item.path} fullwidth>
                    View
                  </Button>
                }
              />
            </Col>
          ))}
        </Row>
      </Grid>
    </Route>
  );
};

export default Homepage;
