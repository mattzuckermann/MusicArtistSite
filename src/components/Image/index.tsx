import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const Image = props => {
  const { placeholderImage } = useStaticQuery(graphql`
    query ImageTrace {
      placeholderImage: file(relativePath: { eq: "mood/IMG_6677.jpeg" }) {
        childImageSharp {
          fluid(maxWidth: 1200) {
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

export default Image;
