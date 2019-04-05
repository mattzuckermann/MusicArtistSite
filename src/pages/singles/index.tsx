import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../../components/Layouts/layout';
import Image from '../../components/Image';
import SEO from '../../components/SEO';
import Archive from '../../components/Archive';
// import 'bootstrap/dist/css/bootstrap.css';
import image1 from '../../images';
import image2 from '../../images';
import image3 from '../../images';
import image4 from '../../images';
import image5 from '../../images';

const Album = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { regex: "/image5/" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
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
        <h1>Singles</h1>
        <img src={data.file.childImageSharp.fluid.src} alt="test" />
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
              <div className="img-zoom-container">
                <div id="myresult" className="img-zoom-result" />
              </div>
              <div
                id="carouselExampleControls"
                className="carousel slide"
                data-ride="carousel"
              />
              <div className="carousel-inner img-zoom-container">
                <div className="carousel-item active">
                  <img
                    id="myimage1"
                    className="d-block"
                    src="{image1}"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    id="myimage2"
                    className="d-block"
                    src="{image2}"
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    id="myimage3"
                    className="d-block"
                    src="{image3}"
                    alt="Third slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    id="myimage4"
                    className="d-block"
                    src="{image4}"
                    alt="Fourth slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    id="myimage5"
                    className="d-block"
                    src="{image5}"
                    alt="Fifth slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="sr-only">Next</span>
              </a>
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
