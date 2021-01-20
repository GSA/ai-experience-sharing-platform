import React, { useEffect } from "react";
import { Grid, Row, Col } from "components/Grid";
import SidebarNav from "./SidebarNav";
import Layout from "features/Layout";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, getPage } from "app/ContentModule";
import { useParams } from "react-router-dom";

const Bok = ({ slug: slugOverride }) => {
  const params = useParams();
  const slug = slugOverride ? slugOverride : params.slug;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPage({ type: "boks", slug }));
  }, [dispatch, slug]);
  const { page: { data = {} } = {} } = useSelector(
    (state) => state[contentName]
  );
  return (
    <Grid>
      <Row gap="2">
        <Col size={2}>
          <SidebarNav current={data.bokSectionId} />
        </Col>
        <Col size={10}>
          <Layout items={data.content} renderTitles={true} />
        </Col>
      </Row>
    </Grid>
  );
};

Bok.propTypes = {};

export default Bok;
