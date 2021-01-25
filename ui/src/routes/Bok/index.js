import React, { useEffect } from "react";
import { Grid, Row, Col } from "components/Grid";
import SidebarNav from "./SidebarNav";
import Layout from "features/Layout";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, getPage } from "app/ContentModule";
import { useParams } from "react-router-dom";

const Bok = () => {
  const { type = "boks", slug = "bok" } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPage({ liftHero: true, type, slug }));
  }, [dispatch, slug, type]);
  const { page: { data = {} } = {} } = useSelector(
    (state) => state[contentName]
  );
  return (
    <div className={`US__bok US__bok_${slug}`}>
      <Grid className="usa-hero">
        {data.heroContent && data.heroContent.length ? <Layout items={data.heroContent} renderTitles={true} /> : null}
      </Grid>
      <Grid className="bok-content">
        <Row gap="2">
          <Col size={2} className="sections">
            <div className="panel">
              <h4>Sections</h4>
              <SidebarNav current={data.bokSectionId} />
            </div>
          </Col>
          <Col size={10}>
            <Grid><h1 className="title">{data.title}</h1></Grid>
            <Layout items={data.content} renderTitles={true} />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

Bok.propTypes = {};

export default Bok;
