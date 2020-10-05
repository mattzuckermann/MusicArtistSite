import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useTrail, useSpring, animated } from 'react-spring';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';
import ReactPlayer from 'react-player';
import TrackLine from '../../components/TrackLine';
import navigator from '../../js/navigator';
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
      margin: '-5px 0px 20px 0px',
      fontSize: '50px',
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
    trackGreen: {
      color: '#1ED760',
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
  const [shuffleIndex, setShuffleIndex] = useState(8);
  const [shuffleIsHovered, setShuffleIsHovered] = useState(false);
  const [repeatIsHovered, setRepeatIsHovered] = useState(false);
  const [myMap, setMyMap] = useState(new Map());
  const audioPlayerEl = useRef(null);

  const shuffleFunction = () => {
    myMap.delete(`${currentTrack}`);
    // if repeat all is selected, refresh "shuffle session" when myMap === 0
    if (Array.from(myMap).length === 0 && loopIndex == 3) {
      for (let i: string in allContentfulSingle.edges) myMap.set(i, i);
    }
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
        // check that tempIndex isn't current track for edge case when
        // repeat all is true and refreshing hash map (i.e. myMap) so
        // same track doesn't play twice in a row (due to refresh of myMap)
        if (myMap.has(`${tempIndex}`) && tempIndex !== currentTrack) {
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
    // switching songs manually will in turn clear the myMap hash map containing
    // the track indices and then refill them to full, thus restarting the "shuffle session."
    myMap.clear();
    for (let i: string in allContentfulSingle.edges) myMap.set(i, i);

    // switching songs manually will in turn set loopIndex back to loop all
    // if loop one is currently selected.
    if (loopIndex === 4) setTimeout(() => setLoopIndex(3), 1000);
  };

  // GraphQL query to read all tracks from contentful and cloudinary.
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
        limit: 15
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
            volume={0.6}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onEnded={() => {
              // Waits a period of time between songs (a tenth of a second)
              setTimeout(() => {
                // Case statement regarding what operation should be done when a song ends.
                // This is dictated by the loop and shuffle buttons which change the loop index and
                // shuffle indices depending on what icons are shown in the UI.
                switch (loopIndex) {
                  // case 4 is repeat one
                  case 4:
                    setPlaying(true);
                    break;
                  // case 2 loop is repeat none
                  case 2:
                    if (shuffleIndex === 9) {
                      shuffleFunction();
                      break;
                    }
                    if (currentTrack != allContentfulSingle.edges.length - 1) {
                      changeTrack(currentTrack + 1);
                      setPlaying(true);
                    }
                    break;
                  // case 3 is repeat all
                  case 3:
                    if (shuffleIndex === 9) {
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
            // onMouseEnter and onMouseLeave alters repeatIsHovered state
            // which affects which source file is used in src attribute (see below)
            // In addition, the imported navigator() function checks if the device is
            // a phone or tablet and ends the process if so since there is no mouse to hover
            // on a phone or tablet
            onMouseEnter={() => {
              if (!navigator()) setRepeatIsHovered(true);
            }}
            onMouseLeave={() => {
              if (!navigator()) setRepeatIsHovered(false);
            }}
            title={
              loopIndex === 2
                ? 'Repeat'
                : loopIndex === 3
                ? 'Repeat Track'
                : "Don't repeat"
            }
            src={
              // checks repeatIsHovered state as well as current loopIndex to alter
              // src file to desired Cloudinary image
              !repeatIsHovered
                ? allCloudinaryMedia.edges[loopIndex].node.url
                : loopIndex === 2
                ? allCloudinaryMedia.edges[5].node.url
                : loopIndex === 3
                ? allCloudinaryMedia.edges[6].node.url
                : allCloudinaryMedia.edges[7].node.url
            }
            style={{ width: '35px', marginBottom: '0px' }}
            draggable={false}
          />
          {/* 
              shuffleButton that changes shuffleIndex thus alters operations of
              "onEnded" attribute on ReactPlayer component
          */}
          <img
            onClick={() => {
              if (shuffleIndex != 9) setShuffleIndex(shuffleIndex + 1);
              else {
                setShuffleIndex(8);
                // setting shuffle back to off will in turn clear the myMap hash map containing
                // the track indices and then refill them to full, thus restarting the "shuffle session."
                myMap.clear();
                for (let i: string in allContentfulSingle.edges)
                  myMap.set(i, i);
              }
            }}
            // onMouseEnter and onMouseLeave alters shuffleIsHovered state
            // which affects which source file is used in src attribute (see below);
            // In addition, the imported navigator() function checks if the device is
            // a phone or tablet and ends the process if so since there is no mouse to hover
            // on a phone or tablet
            onMouseEnter={() => {
              if (!navigator()) setShuffleIsHovered(true);
            }}
            onMouseLeave={() => {
              if (!navigator()) setShuffleIsHovered(false);
            }}
            title={shuffleIndex === 9 ? "Don't shuffle" : 'Shuffle'}
            src={
              // checks shuffleIsHovered state as well as current shuffleIndex to alter
              // src file to desired Cloudinary image
              !shuffleIsHovered
                ? allCloudinaryMedia.edges[shuffleIndex].node.url
                : shuffleIndex === 8
                ? allCloudinaryMedia.edges[10].node.url
                : allCloudinaryMedia.edges[11].node.url
            }
            style={{ width: '35px', marginBottom: '0px' }}
            draggable={false}
          />
          {/* Loops through tracks stored in Contentful and runs React Spring animation on them */}
          {trail.map((props: object, index: number) => {
            let { node: track } = allContentfulSingle.edges[index];
            return (
              <animated.div key={track.trackName} style={props}>
                <TrackLine
                  allContentfulSingle={allContentfulSingle}
                  myMap={allContentfulSingle}
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
