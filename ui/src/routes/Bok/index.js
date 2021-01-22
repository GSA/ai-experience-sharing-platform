import React, { useEffect } from "react";
import { Grid, Row, Col } from "components/Grid";
import SidebarNav from "./SidebarNav";
import Layout from "features/Layout";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, getPage } from "app/ContentModule";
import { useParams } from "react-router-dom";

const Bok = () => {
  const { type = "boks", slug } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPage({ type, slug }));
  }, [dispatch, slug, type]);
  const { page: { data = {} } = {} } = useSelector(
    (state) => state[contentName]
  );
  return (
    <Grid className="US__bok">
      <Row gap="2">
        <Col size={2} className="sections">
          <div className="panel">
            <h4>Sections</h4>
            <SidebarNav current={data.bokSectionId} />
          </div>
        </Col>
        <Col size={10}>
          <Grid><h1>{data.title}</h1></Grid>
          <Layout items={data.content} renderTitles={true} />
        </Col>
      </Row>
    </Grid>
  );
};

Bok.propTypes = {};

export default Bok;
