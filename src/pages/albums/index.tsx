import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../../components/Layouts/layout';
import Image from '../../components/Image';
import SEO from '../../components/SEO';

const Album = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { regex: "/image7/" }) {
          childImageSharp {
            fluid(maxWidth: 200) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Layout>
        <SEO
          description="visibility improvement"
          title="Album"
          keywords={[`music`, `album`, `react`]}
        />
        <h1>Albums</h1>
        <img src={data.file.childImageSharp.fluid.src} alt="Josh Zuckermann" />
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h3 id="titleName" title="Josh Zuckermann">
                Josh Zuckermann
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }} />
            </div>
          </div>
        </div>
        <br />
        {/* <Archive /> */}
      </Layout>
    )}
  />
);

export default Album;
