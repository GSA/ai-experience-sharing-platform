import React, { useEffect } from "react";
import Mdx from "features/Mdx";
import { useSelector, useDispatch } from "react-redux";
import { page, getPage, clearPage } from "app/contentSlice";
import { useParams } from "react-router-dom";
import { Grid, Row, Col } from "components/Grid";
import { Loading } from "components/Loading";

const Page = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const { pending, data = {} } = useSelector(page);
  const { title, body } = data;
  useEffect(() => {
    dispatch(getPage({ type: "page", name }));
    return () => {
      dispatch(clearPage());
    };
  }, [name, dispatch]);
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
