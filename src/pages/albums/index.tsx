import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../../components/Layouts/layout';
import SEO from '../../components/SEO';
import { useSpring, animated } from 'react-spring';

const Album = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 1000 },
  });

  return (
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
        <animated.div style={fade}>
          <SEO
            description="visibility improvement"
            title="Album"
            keywords={[`music`, `album`, `react`]}
          />
          <h1>Albums</h1>
          <h3>[ DEBUT ALBUM COMING SOON ]</h3>
          <br />
        </animated.div>
      )}
    />
  );
};

export default Album;
