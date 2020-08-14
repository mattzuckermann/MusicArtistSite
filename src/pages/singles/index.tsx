import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useTrail, useSpring, animated } from 'react-spring';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import TrackLine from '../../components/TrackLine';
import '../index.css';

const useStyles = makeStyles(() =>
  createStyles({
    singlesBackgroundColor: {
      backgroundColor: '#191919',
      padding: '20px',
    },
    audioPlayer: {
      marginBottom: '3px',
    },
    trackTitle: {
      padding: '25px 0px',
      fontFamily: 'futura',
      borderRadius: 5,
      backgroundColor: '#fb2f47',
    },
    trackHeader: {
      margin: '-10px 0px 20px 0px',
      fontSize: '90px',
    },
    trackButton: {
      fontFamily: 'futura',
      marginLeft: '9px',
      color: '#ffffff',
      width: '200px',
    },
    trackDuration: {
      fontFamily: 'futura',
      marginLeft: '9px',
      color: '#FFFFFF',
      width: '200px',
      fontSize: '11px',
    },
    buttonGeneral: {
      border: '2px solid black',
      borderRadius: '5px',
    },
    buttonPaused: {
      backgroundColor: '#ffffff',
    },
    buttonPlaying: {
      backgroundColor: '#a1bbb5',
    },
    trackBold: {
      fontWeight: 'bold',
    },
  })
);

const Album: FunctionComponent<{ index: number; boolean: boolean }> = ({
  index = '',
  boolean = false,
}) => {
  const classes = useStyles();
  const [on, toggle] = useState(boolean);
  const [faded, changeFaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, changeTrack] = useState(0);
  const audioPlayerEl = useRef(null);

  // Effect to toggle "on" state to true and run animations
  useEffect((): void => {
    toggle(true);
    changeFaded(true);
  }, []);

  const fade = useSpring({
    opacity: faded ? 1 : 0,
    config: { duration: 1000 },
  });

  const setTrack = async index => {
    changeFaded(false);
    setTimeout(() => changeTrack(index), 1000);
    setTimeout(() => changeFaded(true), 1000);
    setTimeout(() => setPlaying(true), 1000);
  };

  // GraphQL query to read all tracks from contentful and cloudinary
  const { allContentfulSingle, allCloudinaryMedia } = useStaticQuery(graphql`
    query tracksQuery {
      allContentfulSingle(sort: { order: ASC, fields: orderNumber }) {
        edges {
          node {
            orderNumber
            trackName
            cloudinaryAudio {
              url
              duration
            }
            cloudinaryImage {
              url
            }
          }
        }
      }
      allCloudinaryMedia(
        sort: { order: ASC, fields: created_at }
        filter: { format: { eq: "png" } }
      ) {
        edges {
          node {
            id
            url
          }
        }
      }
    }
  `);

  // React Spring animations that run once component mounts
  const [trail, set, stop] = useTrail(allContentfulSingle.edges.length, () => ({
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
    <main className={classes.singlesBackgroundColor}>
      <SEO
        title="Singles"
        keywords={[`music`, `album`, `josh`, `zuckermann`, `rap`, `chicago`]}
      />
      <Grid container>
        <Grid item>
          <animated.div style={fade}>
            <h1 className={classes.trackHeader} style={{ color: 'white' }}>
              {allContentfulSingle.edges[currentTrack].node.trackName}
            </h1>
          </animated.div>
        </Grid>
      </Grid>
      <Grid item>
        <animated.div style={fade}>
          <ReactPlayer
            ref={audioPlayerEl}
            className={classes.audioPlayer}
            height="54px"
            padding="10px 0px"
            width="100%"
            volume="0.50"
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            playing={playing}
            url={
              allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0]
                .url
            }
            controls
          />
        </animated.div>
      </Grid>
      <Grid container>
        <Grid item>
          <animated.div style={fade}>
            <img
              style={{
                margin: '25px 0px 0px 0px',
                width: '400px',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF',
              }}
              src={
                allContentfulSingle.edges[currentTrack].node.cloudinaryImage[0]
                  .url
              }
            />
          </animated.div>
        </Grid>
        <Grid item style={{ margin: '25px 0px 0px 5px' }}>
          {trail.map((props: object, index: number) => {
            let { node: track } = allContentfulSingle.edges[index];
            return (
              <animated.div key={track.trackName} style={props}>
                <TrackLine
                  allCloudinaryMedia={allCloudinaryMedia}
                  classes={classes}
                  currentTrack={currentTrack}
                  setTrack={setTrack}
                  playing={playing}
                  setPlaying={setPlaying}
                  track={track}
                  index={index}
                />
              </animated.div>
            );
          })}
        </Grid>
      </Grid>
      <br />
    </main>
  );
};

export default Album;
