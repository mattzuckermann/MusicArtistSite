import React from 'react';
import { Link } from 'gatsby';
import SEO from '../../components/SEO';

const NotFoundPage = () => (
  <div style={{ height: '60vh', margin: '0px 20px' }}>
    <SEO description="visibility improvement" title="404: Not found" />
    <div>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist.</p>
      <br />
      <Link to={`/`}>
        <p>Return to home.</p>
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
