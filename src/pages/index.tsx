import '../components/Header/header.css';
import React from 'react';
import Image from '../components/Image';
import SEO from '../components/SEO';
import Grid from '@material-ui/core/Grid';
import './index.css';
import { useTrail, useSpring, animated } from 'react-spring';

const IndexPage = () => {
  const nameArray = [
    'J',
    'o',
    's',
    'h',
    ' ',
    'Z',
    'u',
    'c',
    'k',
    'e',
    'r',
    'm',
    'a',
    'n',
    'n',
  ];
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 600 },
  });

  const [trail, set, stop] = useTrail(nameArray.length, () => ({
    from: { opacity: 0 },
    opacity: 1,
  }));

  return (
    <animated.div style={fade}>
      <SEO
        description="Josh Zuckermann is a music artist from Chicago, Illinois, talented in classical, jazz, pop, hiphop, and rock."
        title="Home"
        keywords={[`gatsby`, `application`, `react`]}
      />
      <Grid container spacing={3}>
        <Grid item lg={1} xs={1}>
          {trail.map((props, index) => {
            return (
              <animated.div key={index} style={props}>
                <span className="mainTitle">{nameArray[index]}</span>
              </animated.div>
            );
          })}
        </Grid>
        <Grid item lg={11} xs={11}>
          <div
            style={{
              maxWidth: `1000px`,
              marginBottom: `1.45rem`,
              minHeight: `400px` /* height of container */,
              overflow: `hidden`,
            }}
          >
            <Image
              style={{
                borderRadius: 15,
                margin: '-200px -100px -400px -100px',
                minHeight: '1200px',
              }}
            />
          </div>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default IndexPage;
