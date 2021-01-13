import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPage } from "app/ContentModule";
import { Grid } from "components/Grid";
import Loading from "components/Loading";
import FourOhFour from "routes/FourOhFour";
import Head from "routes/Head";
import Layout from "features/Layout";
import useScrollToTop from "utils/useScrollToTop";

const Page = ({ slug }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const pageSlug = slug ? slug : params.slug;
  const page = useSelector((state) => state.content.page);
  useScrollToTop();
  useEffect(() => {
    dispatch(getPage({ slug: pageSlug }));
  }, [dispatch, pageSlug]);
  const { pending, data, error } = page;
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
    <div className={`TxContent Tx__${pageSlug}`}>
      <div className="usa-app__bg">
        <Head title={data.title} />
        <div className={`Tx__${data.slug}-content`}>
          <Layout items={data.content} />
        </div>
      </div>
    </div>
  );
};

export default Page;
