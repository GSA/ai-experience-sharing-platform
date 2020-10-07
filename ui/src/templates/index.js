import React from "react";
import Layout from "templates/layouts/primary";
import Button from "components/Button";
import Card from "components/Card";
import Hero from "features/Hero";

const FeaturedCard = ({ title, url }) => (
  <Card
    className="FeaturedCard"
    title={title}
    excerpt=""
    footer={
      <Button url={url} fullwidth>
        View
      </Button>
    }
  />
);

const IndexPage = ({ data }) => {
  const {
    site: {
      siteMetadata: { title = "", hero: { title: heroTitle = "" } = {} } = {},
    } = {},
    usecasefeatured: { edges = [] } = {},
  } = data;

  return (
    <Layout title={title}>
      <Hero>{heroTitle}</Hero>
      <div className="grid-container">
        <div className="grid-row use-case-header">
          <div className="grid-col-6 use-case-header__title">
            Featured Use Cases
          </div>
          <div className="grid-col-6 use-case-header__link">
            <Button url="/use-case" variant="link">
              View All Use Cases
            </Button>
          </div>
        </div>

        <div className="grid-row grid-gap-6 padding-x-8">
          {edges.map(({ node }) => (
            <div key={node.fields.name} className="grid-col-6 padding-bottom-4">
              <FeaturedCard
                title={node.frontmatter.title}
                url={node.fields.pagePath}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
