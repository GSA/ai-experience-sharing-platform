import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import Layout from 'templates/layouts/primary';
import Button from 'components/Button';
import Card from 'components/Card';
import Content from 'components/Content';
import Hero from 'components/Hero';

const MockCard = ({ title, url }) => (
  <Card
    className="MockCard"
    title={title}
    excerpt={<Content chunks={1} chunkSize={4} lineSize={10} />}
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
      siteMetadata: { title = '', hero: { title: heroTitle = '' } = {} } = {},
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
              <MockCard
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

export const pageQuery = graphql`
  query FeaturedUseCases(
    $featured: Boolean = true
    $type: String = "use-case"
  ) {
    ...UseCaseFeatured @include(if: $featured)
    site {
      siteMetadata {
        title
        hero {
          title
        }
      }
    }
  }
`;

export default IndexPage;
