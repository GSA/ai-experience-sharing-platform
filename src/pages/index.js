import React from 'react';

import Layout from 'templates/layouts/Default';
import SEO from 'templates/components/Seo';
import Hero from 'components/Hero';
import Tagline from 'components/Tagline';
import Highlights from 'components/Highlights';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Hero />
    <Tagline />
    <Highlights />
  </Layout>
);

export default IndexPage;
