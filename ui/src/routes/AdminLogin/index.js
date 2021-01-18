import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPage } from "app/ContentModule";
import { Grid } from "components/Grid";
import Loading from "components/Loading";
import FourOhFour from "routes/FourOhFour";
import Head from "routes/Head";
import useScrollToTop from "utils/useScrollToTop";
import { AdminLogin as AdminLoginTemplate } from "templates/AdminLogin";

const AdminLogin = ({ slug }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const pageSlug = slug ? slug : params.slug;
  const page = useSelector((state) => state.content.page);
  useScrollToTop();
  return (
    <div className={`USLayout US__${pageSlug}`}>
      <div className="usa-app__bg">
        <Head title="Admin Login" />
        <div className={`US__AdminLogin-content`}>
          <AdminLoginTemplate />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
