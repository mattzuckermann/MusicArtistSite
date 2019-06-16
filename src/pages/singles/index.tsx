import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {
  Image,
  Video,
  CloudinaryContext,
  Transformation,
} from 'cloudinary-react';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';
import { useTrail, animated } from 'react-spring';

const Audio = ['Reiki', 'Crush', 'Two Weeks'];

const Album = () => {
  const [on, toggle] = useState(false);
  const [trail, set, stop] = useTrail(3, () => ({
    transform: 'scale(0.8, 0.8), translate3d(-8%,0,0)',
    opacity: 0,
  }));
  set({
    opacity: on ? 1 : 0,
    transform: on
      ? 'scale(1, 1), translate3d(0,0,0,)'
      : 'scale(0.8,0.8), translate3d(-8%,0,0)',
    config: { duration: 3500 / 4 },
  });
  stop();

  useEffect(() => {
    toggle(true);
  }, []);

  return (
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
        <>
          <SEO
            description="visibility improvement"
            title="Album"
            keywords={[`music`, `album`, `react`]}
          />
          <div className="container" style={{ textAlign: 'center' }}>
            <div className="row">
              <div>
                <Grid container spacing={24}>
                  {trail.map((props, index) => (
                    <Grid
                      style={{
                        borderRadius: 10,
                        background: '#fecbd0',
                        margin: '10px 0px 40px 0px',
                      }}
                      key={index}
                      item
                      lg={4}
                      md={6}
                      sm={12}
                      xs={12}
                    >
                      <animated.div style={props}>
                        <h1
                          style={{
                            padding: '25px 0px',
                            fontFamily: 'futura',
                            borderRadius: 5,
                            backgroundColor: '#fb2f47',
                          }}
                        >
                          {Audio[index]}
                        </h1>
                        <CloudinaryContext cloudName="joshzuckermann-netlify-com">
                          <Image
                            publicId={`singlesImages/${Audio[index]}`}
                            format="jpg"
                          >
                            <Transformation
                              crop="fill"
                              gravity="faces"
                              width="300"
                            />
                          </Image>
                          <Video
                            publicId={`singles/${Audio[index]}`}
                            height="30"
                            width="270"
                            format="mp3"
                            controls
                          />
                        </CloudinaryContext>
                        <br />
                        <br />
                        <br />
                      </animated.div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
          <br />
        </>
      )}
    />
  );
};

export default Album;
