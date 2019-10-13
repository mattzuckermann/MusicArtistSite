import React, { FunctionComponent, useState, useEffect } from 'react';
import { useTrail, animated } from 'react-spring';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import '../index.css';

const useStyles = makeStyles(() =>
  createStyles({
    SinglesBackgroundColor: {
      backgroundColor: '#fecbd0',
    },
    audioPlayer: {
      width: '270px !important',
      paddingBottom: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    trackTitle: {
      padding: '25px 0px',
      fontFamily: 'futura',
      borderRadius: 5,
      backgroundColor: '#fb2f47',
    },
  })
);

const Album: FunctionComponent<{ index: string; boolean: boolean }> = ({
  index = '',
  boolean = false,
}) => {
  const classes = useStyles();
  const [playing, setPlaying] = useState(index);
  const [on, toggle] = useState(boolean);

  // Effect to toggle "on" state to true and run animations
  useEffect((): void => {
    toggle(true);
  }, []);

  // GraphQL query to read all tracks from contentful
  const { allContentfulTrack } = useStaticQuery(graphql`
    query tracksQuery {
      allContentfulTrack {
        edges {
          node {
            order
            name
            cloudinary {
              url
              format
              bytes
              duration
            }
            cloudinaryImage {
              url
            }
          }
        }
      }
    }
  `);

  // React Spring animations that run once component mounts
  const [trail, set, stop] = useTrail(allContentfulTrack.edges.length, () => ({
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

  return (
    <main>
      <SEO
        description="visibility improvement"
        title="Album"
        keywords={[`music`, `album`, `josh`, `zuckermann`, `rap`, `chicago`]}
      />
      <Grid container spacing={6} style={{ textAlign: 'center' }}>
        {trail.map((props: object, index: number) => {
          let { node: track } = allContentfulTrack.edges[index];
          return (
            <Grid
              item
              style={{
                borderRadius: 10,
                margin: '10px 0px 40px 0px',
              }}
              key={index}
              lg={6}
              md={6}
              sm={12}
              xs={12}
            >
              <animated.div
                className={`${classes.SinglesBackgroundColor}`}
                style={props}
              >
                <h1 className={classes.trackTitle}>{track.name}</h1>
                <img
                  style={{ width: '300px' }}
                  src={track.cloudinaryImage[0].url}
                />
                <ReactPlayer
                  className={classes.audioPlayer}
                  height="55px"
                  playing={playing === `${index}`}
                  onPlay={() => setPlaying(`${index}`)}
                  url={track.cloudinary[0].url}
                  controls
                />
              </animated.div>
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};

export default Album;
