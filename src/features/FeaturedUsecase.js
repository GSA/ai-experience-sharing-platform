import React, { useEffect } from "react";
import { Row, Col } from "components/Grid";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import Button from "components/Button";
import { getList } from "app/contentSlice";

const FeaturedUsecase = (props) => {
  const dispatch = useDispatch();
  const reload = false;
  const data = useSelector((state) =>
    state.content.list.data.filter((item) => item.featured)
  );
  useEffect(() => {
    dispatch(getList("usecase"));
  }, [dispatch, reload]);
  return (
    <Row className="padding-x-8">
      {data.map((item) => {
        return (
          <Col key={item.name} size={6} className="padding-bottom-4">
            <Card
              className="FeaturedCard"
              title={item.title}
              excerpt={item.excerpt}
              footer={
                <Button url={`/library${item.path}`} fullwidth>
                  View
                </Button>
              }
            />
          </Col>
        );
      })}
    </Row>
  );
};

export default FeaturedUsecase;
