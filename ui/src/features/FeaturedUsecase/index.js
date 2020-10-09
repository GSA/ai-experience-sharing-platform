import React, { useEffect } from "react";
import { Row, Col } from "components/Grid";
import { useSelector, useDispatch } from "react-redux";
import Card from "components/Card";
import Button from "components/Button";
import { getList } from "app/ContentModule";
import { Loading } from "components/Loading";

const FeaturedUsecase = (props) => {
  const dispatch = useDispatch();
  const contentType = "usecase";

  useEffect(() => {
    dispatch(getList(contentType));
  }, [dispatch, contentType]);

  const { pending, data } = useSelector((state) => state.content.list);

  const listData = data.filter((item) => item.featured).slice(0, 4);

  return pending ? (
    <Loading isLoading={pending}>
      <span></span>
    </Loading>
  ) : (
    <Row className="padding-x-8">
      {listData.map((item) => {
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
