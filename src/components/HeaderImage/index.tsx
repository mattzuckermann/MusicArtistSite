import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const HeaderImage = props => (
  <StaticQuery
    query={graphql`
      query HeaderImage {
        placeholderImage: file(relativePath: { eq: "mood/favicon.png" }) {
          childImageSharp {
            fluid(maxWidth: 125) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <Img
        style={props.style}
        fluid={data.placeholderImage.childImageSharp.fluid}
      />
    )}
  />
);
export default HeaderImage;
