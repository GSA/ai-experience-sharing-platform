import React from 'react';

import Layout from 'components/layout';
import SEO from 'components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="grid-container">
      <h1>This is a test page</h1>
    </div>
  </Layout>
);

export default IndexPage;
