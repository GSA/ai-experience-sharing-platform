import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Layout from 'templates/layouts/Primary';
import Hero from 'components/Hero';

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query HeroQuery {
      site {
        siteMetadata {
          title
          hero {
            title
            subtitle
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
      <Hero>
        <div style={{ paddingTop: 150, paddingBottom: 150 }}>{heroTitle}</div>
      </Hero>
      <div style={{ minHeight: 1000 }} />
    </Layout>
  );
};

export default IndexPage;
