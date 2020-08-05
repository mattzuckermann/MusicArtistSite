import React from 'react';
import '../components/Header/header.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import './layout.css';
import Header from '../components/Header';

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query LayoutTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div>
      <Header siteTitle={data.site.siteMetadata.title} location={location} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px`,
        }}
      >
        <main>{children}</main>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
