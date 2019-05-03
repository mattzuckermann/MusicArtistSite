import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import ReactAudioPlayer from 'react-audio-player';

// import cloudinary from 'cloudinary-core';
// import {
//   Img,
//   Video,
//   Transformation,
//   CloudinaryContext,
// } from 'cloudinary-react';
import Layout from '../../../components/Layouts/layout';
import Image from '../../../components/Image';
import SEO from '../../../components/SEO';
import Archive from '../../../components/Archive';
// import 'bootstrap/dist/css/bootstrap.css';
// import Img from 'gatsby-image';
// import image1 from '../../../images/image1.jpeg';
// import image2 from '../../../images/image2.jpeg';
// import image3 from '../../../images/image3.jpeg';
// import image4 from '../../../images/image4.jpeg';
// import image5 from '../../../images/image5.jpeg';

// var cl = new cloudinary.Cloudinary({
//   cloud_name: 'mczuckermann',
//   secure: true,
// });

const Flag = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { regex: "/image5/" }) {
          childImageSharp {
            fluid(maxWidth: 1000) {
              src
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
        <ReactAudioPlayer src="" autoPlay controls />
        <h1>Debut</h1>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div id="titleName" title='Comment: "Josh Zuckermann"'>
                Josh Zuckermann
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
              </div>
            </div>
          </div>
        </div>
        <br />
        {/* <Archive /> */}
      </Layout>
    )}
  />
);

export default Flag;
