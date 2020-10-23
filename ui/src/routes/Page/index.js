import React, { useEffect } from "react";
import Mdx from "features/Mdx";
import { useSelector, useDispatch } from "react-redux";
import { getPage } from "app/ContentModule";
import { useParams } from "react-router-dom";
import { Grid, Row, Col } from "components/Grid";
import { Loading } from "components/Loading";
import FourOhFour from "templates/FourOhFour";

const Page = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { pending, data, error } = useSelector((state) => state.content.page);
  const { title, body } = data;
  useEffect(() => {
    dispatch(getPage({ type: "pages", name }));
  }, [name, dispatch]);

  if (error) {
    return <FourOhFour />;
  }
  return (
    <Loading isLoading={pending}>
      <Grid>
        <Row>
          <Col size={12}>
            <h1>{title}</h1>
            <Mdx>{body}</Mdx>
          </Col>
        </Row>
      </Grid>
    </Loading>
  );
};

export default Page;
