import '../components/Header/header.css';
import React from 'react';
import Image from '../components/Image';
import SEO from '../components/SEO';
import './index.css';
import { useSpring, animated } from 'react-spring';

const IndexPage = () => {
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 600 },
  });

  return (
    <animated.div style={fade}>
      <SEO
        description="Josh Zuckermann is a music artist from Chicago, Illinois, talented in classical, jazz, pop, hiphop, rock, and much more."
        title="Home"
        keywords={[`gatsby`, `application`, `react`]}
      />
      <h1 className="mainTitle">Josh Zuckermann</h1>
      <div
        style={{
          maxWidth: `1000px`,
          marginBottom: `1.45rem`,
        }}
      >
        <Image style={{ borderRadius: 15 }} />
      </div>
    </animated.div>
  );
};

export default IndexPage;
