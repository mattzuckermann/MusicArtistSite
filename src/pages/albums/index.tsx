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
      <SEO title="Albums" keywords={[`music`, `album`, `react`]} />
      <h1 style={{ fontFamily: 'ABeeZee, sans-serif', fontSize: '65px' }}>
        ALBUMS
      </h1>
      <hr style={{ height: '5px', backgroundColor: 'black' }} />
      <h2 style={{ fontFamily: 'ABeeZee, sans-serif' }}>
        Debut album coming soon
      </h2>
      <br />
    </animated.div>
  );
};

export default Album;
