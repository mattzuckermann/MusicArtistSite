import React from 'react';
import SEO from '../../components/SEO';
import { useSpring, animated } from 'react-spring';

const Album = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 700 },
  });

  return (
    <animated.div style={fade}>
      <SEO
        description="visibility improvement"
        title="Album"
        keywords={[`music`, `album`, `react`]}
      />
      <h1>Albums</h1>
      <h3>DEBUT ALBUM COMING SOON</h3>
      <br />
    </animated.div>
  );
};

export default Album;
