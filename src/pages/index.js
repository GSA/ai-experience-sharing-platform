import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'templates/layouts/primary';
import Button from 'components/Button';
import Card from 'components/Card';
import Content from 'components/Content';
import Hero from 'components/Hero';

const MockCard = () => (
  <Card
    className="MockCard"
    title={
      <div>
        <Content style={{ margin: 0 }} chunks={1} chunkSize={1} lineSize={5} />
      </div>
    }
    excerpt={<Content chunks={1} chunkSize={4} lineSize={10} />}
    footer={
      <Button url="/" fullwidth>
        View
      </Button>
    }
  />
);

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      site {
        siteMetadata {
          title
          hero {
            title
          }
        }
      }
    }
  `);
  const {
    site: {
      siteMetadata: { title = '', hero: { title: heroTitle = '' } = {} } = {},
    } = {},
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
        {[1, 2].map((item) => (
          <div className="grid-row grid-gap-6 padding-x-8">
            <div className="grid-col-6 padding-bottom-4">
              <MockCard />
            </div>
            <div className="grid-col-6 padding-bottom-4">
              <MockCard />
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default IndexPage;
