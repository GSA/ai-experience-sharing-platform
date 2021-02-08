import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPage } from "app/ContentModule";
import { Grid } from "components/Grid";
import Loading from "components/Loading";
import FourOhFour from "routes/FourOhFour";
import Head from "routes/Head";
import Layout from "features/Layout";
import useAssertion from "utils/useAssertion";
import useScrollToTop from "utils/useScrollToTop";
import Hero from "components/Hero";

const Page = ({ slug }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const pageSlug = slug ? slug : params.slug;
  const page = useSelector((state) => state.content.page);
  useScrollToTop();
  useEffect(() => {
    dispatch(getPage({ slug: pageSlug }));
  }, [dispatch, pageSlug]);
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
    <div className={`USLayout US__page US__${pageSlug}`}>
      <div className="usa-app__bg">
        {hero && <Hero {...hero} />}
        <Head title={data.title} />
        <div className={`US__content US__${data.slug}-content`}>
          <Layout items={layoutContent} renderTitles={false} />
        </div>
      </div>
    </div>
  );
};

export default Page;
