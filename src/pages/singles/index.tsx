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
import '../../components/SpotifyAudioPlayer/input.css';

const useStyles = makeStyles(() =>
  createStyles({
    singlesBackgroundColor: {
      backgroundColor: `#1a1a1a`,
      padding: '20px',
    },
    audioPlayer: {
      marginBottom: '3px',
    },
    trackTitle: {
      padding: '25px 0px',
      fontFamily: 'futura',
    },
    singlesHeader: {
      fontSize: '45px',
      fontFamily: 'futura',
      margin: '-5px 0px 22px 15px',
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
    lineDivide: {
      height: '5px',
      backgroundColor: 'white',
    },
  })
);

const Singles: FunctionComponent<{ index: number; boolean: boolean }> = ({
  index = '',
  boolean = false,
}) => {
  // GraphQL query to read all tracks from contentful and cloudinary.
  const { allContentfulSingle, allCloudinaryMedia } = useStaticQuery(graphql`
    query tracksQuery {
      allContentfulSingle(sort: { order: ASC, fields: orderNumber }) {
        edges {
          node {
            orderNumber
            trackName
            cloudinaryAudio {
              secure_url
              duration
            }
            cloudinaryImage {
              secure_url
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
            secure_url
          }
        }
      }
    }
  `);

  const classes = useStyles();
  const [on, toggle] = useState(boolean);
  const [trackDuration, setTrackDuration] = useState("0:00");
  const [faded, changeFaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [currentTrack, changeTrack] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [previousRepeatIndex, setPreviousRepeatIndex] = useState(0);
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [previousShuffleIndex, setPreviousShuffleIndex] = useState(0);
  const [playPauseIndex, setPlayPauseIndex] = useState(0);
  const [leftTrackIndex, setLeftTrackIndex] = useState(0);
  const [rightTrackIndex, setRightTrackIndex] = useState(0);
  const [myMap, setMyMap] = useState(new Map());

  // ! DO NOT DISTURB ORDER OF SPLICING
  const allIcons = [...allCloudinaryMedia.edges];
  // const oldPlayPauseIcon = allIcons.splice(0,2);
  const repeatIcons = allIcons.splice(2,8);
  const shuffleIcons = allIcons.splice(2,5);
  const playPauseIcons = allIcons.splice(2,6);
  const leftTrackIcons = allIcons.splice(2,2);
  const rightTrackIcons = allIcons.splice(2,2);

  const audioPlayerEl = useRef(null);

  const shuffleFunction = () => {
    myMap.delete(`${currentTrack}`);
    // if repeat all is selected, refresh "shuffle session" when myMap === 0
    if (Array.from(myMap).length === 0 && repeatIndex == 1) {
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
      } else {
        setPlayPauseIndex(0);
        changeTrack(0);
        setPlaying(false);
        setShuffleIndex(0);
      }
    };
    // Run recursive "checkHash" function, thus changing the track index
    // and setting "playing" boolean to true.
    checkHash();
  };

  const onEndedFunction = () => {
    // Waits a period of time between songs (a tenth of a second)
    setTimeout(() => {
      // Case statement regarding what operation should be done when a song ends.
      // This is dictated by the repeat and shuffle buttons which change repeatIndex and
      // shuffleIndex respectively depending on what icons are shown in the UI.
      switch (repeatIndex) {
        // case 2 and case 5 is repeat one
        case 2:
        case 5:
          changeTrack(currentTrack)
          setPlaying(true);
          break;
        // case 0 and case 3 is repeat none
        case 0:
        case 3:
          if (shuffleIndex === 1) {
            shuffleFunction();
            break;
          }
          if (currentTrack != allContentfulSingle.edges.length - 1) {
            changeTrack(currentTrack + 1);
            setPlaying(true);
          } else {
            setPlayPauseIndex(0);
          }
          break;
        // case 1 and case 4 is repeat all
        case 1:
        case 4:
          if (shuffleIndex === 1) {
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
  }

  const formatTrackDuration = trackTime => {
    const minutes = Math.floor(trackTime / 60);
    const minutesFormatted = minutes < 10 ? `${minutes}` : minutes;
    const seconds = Math.floor(trackTime % 60);
    const secondsFormatted = seconds === 0 ? '00' : seconds;
    const trackDurationFormatted = `${minutesFormatted}:${secondsFormatted}`;
    setTrackDuration(trackDurationFormatted);
  };

  // Effect to toggle "on" state to true and run animations
  useEffect((): void => {
    toggle(true);
    changeFaded(true);
    for (let i in allContentfulSingle.edges) myMap.set(i, i);
  }, []);
  
  useEffect((): void => {
    formatTrackDuration(allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0].duration)
  }, [currentTrack]);

  const fade = useSpring({
    opacity: faded ? 1 : 0,
    config: { duration: 1000 },
  });

  const setTrack = async index => {
    changeFaded(false);
    setTimeout(() => changeTrack(index), 1000);
    setTimeout(() => changeFaded(true), 1000);
    setTimeout(() => setPlaying(true), 1000);
    setTimeout(() => setPlayPauseIndex(3), 1000);
    // switching songs manually will in turn clear the myMap hash map containing
    // the track indices and then refill them to full, thus restarting the "shuffle session."
    myMap.clear();
    for (let i in allContentfulSingle.edges) myMap.set(i, i);

    // switching songs manually will in turn set loopIndex back to loop all
    // if loop one is currently selected.
    if (repeatIndex === 2) setTimeout(() => setRepeatIndex(1), 1000);
  };

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
          <h1 className={classes.singlesHeader} style={{ color: 'white' }}>
            Singles
          </h1>
        </Grid>
      </Grid>
      <hr className={classes.lineDivide} />
      <Grid item>
        <div>
          <div style={{ textAlign: "center", userSelect: "none" }}>
            {/* 
                shuffleButton that changes shuffleIndex thus alters operations of
                "onEnded" attribute on ReactPlayer component
            */}
          <img
            onClick={() => {
              if (shuffleIndex != shuffleIcons.length - 2) setShuffleIndex(shuffleIndex + 1);
              else {
                setShuffleIndex(2);
                // setting shuffle back to off will in turn clear the myMap hash map containing
                // the track indices and then refill them to full, thus restarting the "shuffle session."
                myMap.clear();
                for (let i: string in allContentfulSingle.edges)
                  myMap.set(i, i);
              }
            }}
            // onMouseEnter and onMouseLeave alters the shuffleIndex state
            // which affects which source file is used in src attribute (see below);
            // In addition, the imported navigator() function checks if the device is
            // a phone or tablet and ends the process if so since there is no mouse to hover
            // on a phone or tablet
            onMouseEnter={() => {
              if (!navigator() && shuffleIndex === 0) {
                setShuffleIndex(2)
              } else if (!navigator() && shuffleIndex === 1) {
                setShuffleIndex(3)
              }
            }}
            onMouseLeave={() => {
              if (!navigator() && shuffleIndex === 2) {
                setShuffleIndex(0)
              } else if (!navigator() && shuffleIndex === 3) {
                setShuffleIndex(1)
              }
            }}
            onMouseDown={() => {
              if (!navigator() && shuffleIndex === 2) {
                setPreviousShuffleIndex(shuffleIndex);
                setShuffleIndex(0);
              } else if (!navigator() && shuffleIndex === 3) {
                setPreviousShuffleIndex(shuffleIndex);
                setShuffleIndex(4);
              }
            }}
            onMouseUp={() => {
              setShuffleIndex(previousShuffleIndex);
            }}
            title={shuffleIndex === 2 ? 'Shuffle' : 'Don\'t shuffle'}
            src={shuffleIcons[shuffleIndex].node.secure_url}
            style={{ width: '40px', marginBottom: '18px' }}
            draggable={false}
          />
          <img 
            onClick={() => {
              if (repeatIndex === 2) setRepeatIndex(1);
              if (shuffleIndex === 1) shuffleFunction();
              else if (currentTrack === 0) {
                if (repeatIndex === 1) {
                  changeTrack(allContentfulSingle.edges.length - 1);
                  setPlayPauseIndex(3);
                } else if (repeatIndex === 0) {
                  setPlaying(false);
                  setPlayPauseIndex(0);
                }
              } else {
                changeTrack(currentTrack - 1);
                setPlayPauseIndex(3);
                setPlaying(true);
              }
            }}
            // onClick={() => {
            //   if (currentTrack !== 0) {
            //     changeTrack(currentTrack - 1);
            //     setPlaying(true);
            //   } else {
            //     changeTrack(allContentfulSingle.edges.length - 1)
            //     setPlaying(true);
            //   }
            // }}
            title='Previous'
            src={leftTrackIcons[leftTrackIndex].node.secure_url}
            style={{ width: "50px", margin: "12px 18px" }}
            draggable={false}
            onMouseEnter={() => setLeftTrackIndex(1)}
            onMouseLeave={() => setLeftTrackIndex(0)}
            onMouseDown={()=> setLeftTrackIndex(0)}
            onMouseUp={()=> setLeftTrackIndex(1)}
          />
          <img
            title={playing ? 'Pause' : 'Play'}
            style={{ width: "60px", margin: "0px" }}
            src={playPauseIcons[playPauseIndex].node.secure_url}
            onClick={() => {
                setPlaying(!playing);
              }
            }
            draggable={false}
            onMouseEnter={() => playing ? setPlayPauseIndex(4) : setPlayPauseIndex(1)}
            onMouseLeave={() => playing ? setPlayPauseIndex(3) : setPlayPauseIndex(0)}
            onMouseDown={() => playing ? setPlayPauseIndex(5) : setPlayPauseIndex(2)}
            onMouseUp={() => playing ? setPlayPauseIndex(1) : setPlayPauseIndex(4)}
          />
          <img 
            onClick={() => {
              if (repeatIndex === 2) setRepeatIndex(1);
              if (shuffleIndex === 1) shuffleFunction();
              else if (currentTrack === allContentfulSingle.edges.length - 1) {
                changeTrack(0);
                setPlayPauseIndex(3);
                if (repeatIndex === 0) {
                  setPlaying(false);
                  setPlayPauseIndex(0);
                }
              } else {
                changeTrack(currentTrack + 1);
                setPlayPauseIndex(3);
                setPlaying(true);
              }
            }}
            title='Next'
            src={rightTrackIcons[rightTrackIndex].node.secure_url}
            style={{ width: "50px", margin: "12px 18px" }}
            draggable={false}
            onMouseEnter={() => setRightTrackIndex(1)}
            onMouseLeave={() => setRightTrackIndex(0)}
            onMouseDown={()=> setRightTrackIndex(0)}
            onMouseUp={()=> setRightTrackIndex(1)}
          />
          {/* 
              Loop button that is responsible for dictating behavior of
              onEnded parameter for ReactPlayer component
          */}
          <img
            onClick={() => {
              if (repeatIndex != repeatIcons.length - 3) setRepeatIndex(repeatIndex + 1);
              else setRepeatIndex(3);
            }}
            // onMouseEnter and onMouseLeave alters repeatIndex state
            // which affects which source file is used in src attribute (see below)
            // In addition, the imported navigator() function checks if the device is
            // a phone or tablet and ends the process if so since there is no mouse to hover
            // on a phone or tablet
            onMouseEnter={() => {
              if (!navigator() && repeatIndex === 0) {
                setRepeatIndex(3);
              } else if (!navigator() && repeatIndex === 1) {
                setRepeatIndex(4);
              } else if (!navigator() && repeatIndex === 2) {
                setRepeatIndex(5);
              }
            }}
            onMouseLeave={() => {
              if (!navigator() && repeatIndex === 3) {
                setRepeatIndex(0)
              } else if (!navigator() && repeatIndex === 4) {
                setRepeatIndex(1)
              } else if (!navigator() && repeatIndex === 5) {
                setRepeatIndex(2)
              }
            }}
            onMouseDown={() => {
              if (!navigator() && repeatIndex === 3) {
                setPreviousRepeatIndex(repeatIndex);
                setRepeatIndex(0);
              } else if (!navigator() && repeatIndex === 4) {
                setPreviousRepeatIndex(repeatIndex);
                setRepeatIndex(6);
              } else if (!navigator() && repeatIndex === 5) {
                setPreviousRepeatIndex(repeatIndex);
                setRepeatIndex(7);
              }
            }}
            onMouseUp={() => {
              setRepeatIndex(previousRepeatIndex);
            }}
            title={
              repeatIndex === 3
                ? 'Repeat'
                : repeatIndex === 4
                ? 'Repeat Track'
                : "Don't repeat"
            }
            src={repeatIcons[repeatIndex].node.secure_url}
            style={{ width: '40px', marginBottom: '18px' }}
            draggable={false}
          />
          </div>
          <div style={{ textAlign: "center"}}>
            <span>0:00 </span>
            <input type="range" min={1} max={1000} value={0}/>
            <span> -{trackDuration}</span>
          </div>
          <ReactPlayer
            ref={audioPlayerEl}
            // style={{ display: "none" }}
            className={classes.audioPlayer}
            height="54px"
            padding="10px 0px"
            width="100%"
            volume={0.6}
            onPause={() => setPlaying(false)}
            onPlay={() => setPlaying(true)}
            onEnded={() => onEndedFunction()}
            playing={playing}
            url={
              allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0]
                .secure_url
            }
            controls={true}
          />
        </div>
      </Grid>
      <Grid container>
        <Grid item>
          <animated.div style={fade}>
            <img
              style={{
                margin: '25px 0px 0px 0px',
                width: '400px',
                height: '400px',
                marginRight: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid #FFFFFF',
              }}
              src={
                allContentfulSingle.edges[currentTrack].node.cloudinaryImage[0]
                  .secure_url
              }
            />
          </animated.div>
        </Grid>
        <Grid item style={{ margin: '25px 0px 0px 5px' }}>
          {/* Loops through tracks stored in Contentful and runs React Spring animation on them */}
          {trail.map((props: object, index: number) => {
            let { node: track } = allContentfulSingle.edges[index];
            return (
              <animated.div key={track.trackName} style={props}>
                <TrackLine
                  setPlayPauseIndex={setPlayPauseIndex}
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
    </main>
  );
};

export default Singles;
