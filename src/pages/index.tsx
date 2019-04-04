import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/Layouts/layout';
import Image from '../components/Image';
import SEO from '../components/SEO';
import Archive from '../components/Archive';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <h1>Hey peeps...</h1>
    <p>Welcome to my music site.</p>
    <p>Enjoy the sweet tunes.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <br />
    <br />
    {() => {
      const scott: boolean = 'hey';
    }}
    {/* <Archive /> */}
  </Layout>
);

export default IndexPage;
