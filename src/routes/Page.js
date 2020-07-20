import React, { useEffect } from "react";
import Mdx from "features/Mdx";
import { useSelector, useDispatch } from "react-redux";
import { page, getPage } from "app/contentSlice";
import { useParams } from "react-router-dom";
import { Grid, Row, Col } from "components/Grid";

const Page = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { data = {} } = useSelector(page);
  const { title, body } = data;
  useEffect(() => {
    dispatch(getPage({ type: "page", name }));
  }, [name, dispatch]);
  return (
    <Grid>
      <Row>
        <Col size={12}>
          <h1>{title}</h1>
          <Mdx>{body}</Mdx>
        </Col>
      </Row>
    </Grid>
  );
};

export default Page;
