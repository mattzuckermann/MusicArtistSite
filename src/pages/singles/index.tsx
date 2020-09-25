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
  const [loopIndex, setLoopIndex] = useState(2);
  const [shuffleIndex, setShuffleIndex] = useState(5);
  const [myMap, setMyMap] = useState(new Map());
  const audioPlayerEl = useRef(null);

  const shuffleFunction = () => {
    myMap.delete(`${currentTrack}`);
    // recursive function that generates random number within singles array
    // and checks hash map containing remaining tracks that haven't played
    // during this "shuffle session."
    const checkHash = () => {
      // The conditional wrapping the function statement is to prevent an infinite
      // loop once the hash map is completely empty; if omitted, the recursive
      // "checkHash" function would never exit after the last song has been played
      // within that particular "shuffle session" and in time the website would likely crash.
      if (Array.from(myMap).length != 0) {
        let tempIndex = Math.floor(
          Math.random() * allContentfulSingle.edges.length
        );
        if (myMap.has(`${tempIndex}`)) {
          changeTrack(tempIndex);
          setPlaying(true);
        } else {
          checkHash();
        }
      }
    };
    // Run recursive "checkHash" function, thus changing the track index
    // and setting "playing" boolean to true.
    checkHash();
  };

  // Effect to toggle "on" state to true and run animations
  useEffect((): void => {
    toggle(true);
    changeFaded(true);
    for (let i: string in allContentfulSingle.edges) myMap.set(i, i);
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
    setTimeout(() => setLoopIndex(2), 1000);
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
            volume="1"
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onEnded={() => {
              // Waits a period of time between songs (a tenth of a second)
              setTimeout(() => {
                // Case statement regarding what operation should be done when a song ends.
                // This is dictated by the loop and shuffle buttons which change the loop index and
                // shuffle indices depending on what icons are shown in the UI.
                switch (loopIndex) {
                  case 4:
                    setPlaying(true);
                    break;
                  case 2:
                    if (shuffleIndex === 6) {
                      shuffleFunction();
                      break;
                    }
                    if (currentTrack != allContentfulSingle.edges.length - 1) {
                      changeTrack(currentTrack + 1);
                      setPlaying(true);
                    }
                    break;
                  case 3:
                    if (shuffleIndex === 6) {
                      shuffleFunction();
                      break;
                    }
                    if (currentTrack != allContentfulSingle.edges.length - 1) {
                      changeTrack(currentTrack + 1);
                      setPlaying(true);
                    } else {
                      changeTrack(0);
                      setPlaying(true);
                    }
                    break;
                }
              }, 100);
            }}
            playing={playing}
            url={
              allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0]
                .url
            }
            controls={true}
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
          {/* 
            Loop button that is responsible for dictating behavior of
            onEnded parameter for ReactPlayer component
        */}
          <img
            onClick={() => {
              if (loopIndex != 4) setLoopIndex(loopIndex + 1);
              else setLoopIndex(2);
            }}
            src={allCloudinaryMedia.edges[loopIndex].node.url}
            style={{ width: '35px', marginBottom: '0px' }}
            draggable={false}
            title={
              loopIndex === 2
                ? 'Repeat'
                : loopIndex === 3
                ? 'Repeat Track'
                : "Don't repeat"
            }
          />
          {/* 
              shuffleButton that changes shuffleIndex thus alters operations of
              "onEnded" attribute on ReactPlayer component
          */}
          <img
            onClick={() => {
              if (shuffleIndex != 6) setShuffleIndex(shuffleIndex + 1);
              else {
                setShuffleIndex(5);
                // setting shuffle back to off will in turn clear the myMap hash map containing
                // the track indices and then refill them to full, thus restarting the "shuffle session."
                myMap.clear();
                for (let i: string in allContentfulSingle.edges)
                  myMap.set(i, i);
              }
            }}
            title={shuffleIndex === 6 ? "Don't shuffle" : 'Shuffle'}
            src={allCloudinaryMedia.edges[shuffleIndex].node.url}
            style={{ width: '35px', marginBottom: '0px' }}
            draggable={false}
          />
          {/* Loops through tracks stored in Contentful and runs React Spring animation on them */}
          {trail.map((props: object, index: number) => {
            let { node: track } = allContentfulSingle.edges[index];
            return (
              <animated.div key={track.trackName} style={props}>
                <TrackLine
                  allCloudinaryMedia={allCloudinaryMedia}
                  classes={classes}
                  currentTrack={currentTrack}
                  setTrack={setTrack}
                  setLoopIndex={setLoopIndex}
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
    </main>
  );
};

export default Album;
