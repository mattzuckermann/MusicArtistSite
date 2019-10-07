import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const HeaderImage = props => {
  const { placeholderImage } = useStaticQuery(graphql`
    query HeaderImage {
      placeholderImage: file(relativePath: { eq: "mood/favicon.png" }) {
        childImageSharp {
          fluid(maxWidth: 125) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `);
  return (
    <Img style={props.style} fluid={placeholderImage.childImageSharp.fluid} />
  );
};

export default HeaderImage;
