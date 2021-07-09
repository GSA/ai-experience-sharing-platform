import React from "react";
import { useParams } from "react-router-dom";
import Head from "routes/Head";
import useScrollToTop from "utils/useScrollToTop";
import { AdminLogin as AdminLoginTemplate } from "templates/AdminLogin";

const AdminLogin = ({ slug }) => {
  const params = useParams();
  /* istanbul ignore next */
  const pageSlug = slug ? slug : params.slug;
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
