import React, { useEffect } from "react";
import { Grid, Row, Col } from "components/Grid";
import BokSidebarNav from "./BokSidebarNav";
import Layout from "features/Layout";
import { useDispatch, useSelector } from "react-redux";
import { name as contentName, getPage } from "app/ContentModule";
import { useParams } from "react-router-dom";
import Hero from "components/Hero";
import useScrollToTop from "utils/useScrollToTop";
import useAssertion from "utils/useAssertion";
import Head from "routes/Head";
import Loading from "components/Loading";
import FourOhFour from "routes/FourOhFour";

const Bok = ({ slug: slugOverride }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const slug = slugOverride ? slugOverride : params.slug;
  const page = useSelector((state) => state[contentName].page);
  useScrollToTop();
  useEffect(() => {
    dispatch(getPage({ type: "boks", slug }));
  }, [dispatch, slug]);
  useAssertion();
  const { pending, data, error } = page;
  const { content = [] } = data;
  const hero = content.find((item) => item.__component === "content.hero");
  const layoutContent = content.filter(
    (item) => item.__component !== "content.hero"
  );

  if (pending) {
    return (
      <Grid>
        <Head title="Loading..." />
        <div className="margin-y-9 margin-x-auto">
          <Loading isLoading={true}>
            <span />
          </Loading>
        </div>
      </Grid>
    );
  }
  if (error) {
    return <FourOhFour />;
  }
  return (
    <div className={`USLayout US__page US__bok US__${slug}`}>
      <div className="usa-app__bg">
        <Head title={data.title} />
        {hero && <Hero {...hero} />}
        <div className={`US__content US__${data.slug}-content`}>
          <Grid>
            <Row gap="2">
              <Col
                size="12"
                desktop="2"
                className="margin-bottom-2 desktop:margin-bottom-0"
              >
                <BokSidebarNav current={data.bokSectionId} />
              </Col>
              <Col size="12" desktop="10">
                <Layout items={layoutContent} renderTitles={true} />
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

Bok.propTypes = {};

export default Bok;
