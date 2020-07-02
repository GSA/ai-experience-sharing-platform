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
      <div style={{ minHeight: 1000 }} />
    </Layout>
  );
};

export default IndexPage;
