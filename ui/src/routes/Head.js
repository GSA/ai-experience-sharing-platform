import React from "react";
import Helmet from "react-helmet";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Head = (props) => {
  const page = useSelector((state) => state.content.page.data);
  const siteTitle = useSelector((state) => state.site["title"]);

  const { pathname } = useLocation();
  // const siteURL = "https://ai.gsa.gov";
  const siteURL = "https://strapi-api-host-prod.app.cloud.gov";
  const defaultShareImage = siteURL + "/images/ai-social-share.png";
  const title = page.title + " | " + siteTitle; // page or site title
  const description = page.description || "The "+siteTitle+" supports our agency partners in accelerating the adoption of Artificial Intelligence (AI) across the federal government."; // page or site description
  const url = siteURL + pathname; // page url/link

  return (
    <Helmet {...props}>
      <link rel="canonical" href={url} />
      <meta name="description" content={description} />
      <meta content={url} property="og:url" />
      <meta content={title} property="og:site_name" />
      <meta content={title} property="og:title" />
      <meta content={title} property="twitter:title" />
      <meta content="website" property="og:type" />
      <meta content={description} property="og:description" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content="usgsa" name="twitter:site" />
      <meta content={defaultShareImage} property="og:image" />
      <meta content={defaultShareImage} name="twitter:image" />
    </Helmet>
  );
};

Head.propTypes = {};

export default Head;
