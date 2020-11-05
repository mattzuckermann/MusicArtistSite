import React, { FunctionComponent, useState, useEffect, useRef } from 'react';
import { useTrail, useSpring, animated } from 'react-spring';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { useStaticQuery, graphql } from 'gatsby';
import classNames from 'classnames';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';
import AlbumCoverRotated from '../../components/AlbumCoverRotated'
import TrackLine from '../../components/TrackLine'
import navigator from '../../js/navigator.js';
import '../index.css';
import '../../components/SpotifyAudioPlayer/input.css';
import './index.css'

const useStyles = makeStyles(() =>
  createStyles({
    singlesBackgroundColor: {
      backgroundColor: `#1b1b1b`,
      borderRadius: '35px',
      padding: '20px',
      marginBottom: '25px',
      '@media(max-width: 975px)': {
        borderRadius: '0px',
      },
    },
    audioPlayer: {
      width: "100%",
      marginBottom: '3px',
    },
    trackTitle: {
      padding: '25px 0px',
    },
    singlesHeader: {
      fontSize: '45px',
      margin: '-5px 0px 22px 15px',
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
      visibility: 'hidden',
    },
    lineDivide: {
      height: '5px',
      backgroundColor: 'white',
    },
    trackNameContainer: {
      marginLeft: "150px",
      '@media(max-width: 970px)': {
        marginLeft: '105px',
      },
      '@media(max-width: 880px)': {
        marginLeft: '75px',
      },
      '@media(max-width: 820px)': {
        marginLeft: '50px',
      },
      '@media(max-width: 765px)': {
        marginLeft: '35px',
      },
      '@media(max-width: 679px)': {
        marginLeft: '115px',
      },
      '@media(max-width: 640px)': {
        marginLeft: '95px',
      },
      '@media(max-width: 600px)': {
        marginLeft: '75px',
      },
      '@media(max-width: 560px)': {
        marginLeft: '50px',
      },
      '@media(max-width: 520px)': {
        marginLeft: '25px',
      },
      '@media(max-width: 499px)': {
        marginLeft: '0px',
      },
    },
    trackLines: {
      margin: '25px 0px 0px 5px',
      '@media(max-width: 679px)': {
        marginLeft: '35px',
      },
      '@media(max-width: 500px)': {
        marginLeft: '25px',
      },
      '@media(max-width: 340px)': {
        marginLeft: '9px',
      },
    },
    singleCover: {
      margin: '25px 0px 0px 0px',
      width: '400px',
      height: '400px',
      marginRight: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid #FFFFFF',
      '@media(max-width: 400px)': {
        height: 'auto',
      },
    },
    trackChange: {
      width: "50px",
      margin: "12px 20px",
      '@media(max-width: 350px)': {
        margin: "12px 8px",
      },
    },
    loadingWheelGeneral: {
      width: "20px",
      margin: "0px 1px",
      visibility: 'hidden',
    },
    loadingWheelVisible: {
      visibility: 'visible',
    },
  })
);

const Singles: FunctionComponent<{ index: number; boolean: boolean }> = ({
  index = '',
  boolean = false,
}) => {
  // GraphQL query to read all audio and images from Contentful and Cloudinary.
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
        limit: 27
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
  
  const [dataFullyLoaded, setDataFullyLoaded] = useState(false);
  const [loadTakingTooLong, setLoadTakingTooLong] = useState(false);
  const [on, toggle] = useState(boolean);
  const [inputMouseIsDown, setInputMouseIsDown] = useState(false);
  const [previousPlayerStatePaused, setPreviousPlayerStatePaused] = useState(boolean)
  const [inputValue, setInputValue] = useState(0);
  const [timeFormat, setTimeFormat] = useState(true);
  const [faded, changeFaded] = useState(false);
  const [initialFaded, changeInitialFaded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [albumCoverIsHovered, setAlbumCoverIsHovered] = useState(null);

  const [currentTrack, changeTrack] = useState(0);
  const [repeatIndex, setRepeatIndex] = useState(0);
  const [previousRepeatIndex, setPreviousRepeatIndex] = useState(0);
  const [shuffleIndex, setShuffleIndex] = useState(0);
  const [previousShuffleIndex, setPreviousShuffleIndex] = useState(0);
  const [playPauseIndex, setPlayPauseIndex] = useState(0);
  const [leftTrackIndex, setLeftTrackIndex] = useState(0);
  const [rightTrackIndex, setRightTrackIndex] = useState(0);
  const [myMap, setMyMap] = useState(new Map());

  const allIcons = [...allCloudinaryMedia.edges];
  // ! DO NOT CHANGE ORDER OF SPLICING
  const repeatIcons = allIcons.splice(0,8);
  const shuffleIcons = allIcons.splice(0,5);
  const playPauseIcons = allIcons.splice(0,8);
  const leftTrackIcons = allIcons.splice(0,2);
  const rightTrackIcons = allIcons.splice(0,2);
  const soundIcons = allIcons.splice(0,2);
  
  const audioTag = useRef(null);
  const albumCover = useRef(null);

  const shuffleFunction = () => {
    myMap.delete(`${currentTrack}`);
    // if repeat all is selected, refresh "shuffle session" when myMap === 0
    if (Array.from(myMap).length === 0 && repeatIndex == 1) {
      for (let i in allContentfulSingle.edges) myMap.set(i, i);
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
        if (myMap.has(`${tempIndex}`) && tempIndex !== currentTrack && tempIndex !== currentTrack + 1) {
          if (!navigator()) setPlayPauseIndex(3);
          else setPlayPauseIndex(7);
          changeTrack(tempIndex);
          setPlaying(true);
          audioTag.current.load();
          audioTag.current.play();
        } else {
          checkHash();
        }
      } else {
        if (!navigator()) {
          setPlayPauseIndex(0);
          setShuffleIndex(0);
        } else {
          setPlayPauseIndex(6);
          setShuffleIndex(2);
        }
        changeTrack(0);
        setInputValue(0);
        setPlaying(false);
        audioTag.current.load();
        for (let i in allContentfulSingle.edges) myMap.set(i, i);
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
          changeTrack(currentTrack);
          setPlaying(true);
          audioTag.current.load();
          audioTag.current.play();
          setInputValue(0);
          break;
        // case 0 and case 3 is repeat none
        case 0:
        case 3:
          if (shuffleIndex === 1) {
            shuffleFunction();
            break;
          } else if (currentTrack != allContentfulSingle.edges.length - 1) {
            changeTrack(currentTrack + 1);
            audioTag.current.load();
            audioTag.current.play();
            setInputValue(0);
          } else {
            if (!navigator()) setPlayPauseIndex(0);
            else setPlayPauseIndex(6);
            changeTrack(0);
            audioTag.current.load();
            setInputValue(0);
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
            audioTag.current.load();
            audioTag.current.play();
            setInputValue(0);
          } else {
            changeTrack(0);
            audioTag.current.load();
            audioTag.current.play();
            setInputValue(0);
          }
          break;
      }
    }, 100);
  }

  const incrementInputValue = function() {
    setInputValue(inputValue + 1);
  }
  
  const formatTrackDuration = trackTime => {
    const minutes = Math.floor(trackTime / 60);
    const minutesFormatted = minutes < 10 ? `${minutes}` : minutes;
    const seconds = Math.floor(trackTime % 60);
    const secondsFormatted = seconds < 10 ? '0' + seconds : seconds;
    const trackDurationFormatted = `${minutesFormatted}:${secondsFormatted}`;
    return trackDurationFormatted;
  };

  // Effect to toggle "on" state to true and run animations
  useEffect((): void => {
    toggle(true);
    changeFaded(true);
    changeInitialFaded(true);
    audioTag.current.volume = 0.6;
    const checkTrackTime = setInterval(() => setInputValue(audioTag.current.currentTime), 1000)
    for (let i in allContentfulSingle.edges) myMap.set(i, i);

    if (navigator()) {
      setShuffleIndex(2);
      setLeftTrackIndex(1);
      setPlayPauseIndex(6);
      setRightTrackIndex(1);
      setRepeatIndex(3);
    }

    const spaceBarPlayPause = e => {
      e.preventDefault();
      if (e.code === "Space") {
        if (audioTag.current.paused) {
          if (!navigator()) setPlayPauseIndex(3)
          else setPlayPauseIndex(6);
          audioTag.current.play();
          setPlaying(true);
        } else {
          if (!navigator()) setPlayPauseIndex(0)
          else setPlayPauseIndex(7);
          audioTag.current.pause();
          setPlaying(false);
        };
      }
    }
    
    window.addEventListener('keypress', spaceBarPlayPause);

    return () => {
      clearInterval(checkTrackTime);
      window.removeEventListener('keypress', spaceBarPlayPause);
    }
  }, []);
  
  useEffect((): void => {
    setLoadTakingTooLong(false);
    const checkLoadTime = setTimeout(() => setLoadTakingTooLong(true), 2500)
    setDataFullyLoaded(false);
    formatTrackDuration(allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0].duration);

    return () => clearInterval(checkLoadTime);
  }, [currentTrack]);

  const fade = useSpring({
    opacity: faded ? 1 : 0,
    config: { duration: 1000 },
  });
  
  const initialFade = useSpring({
    opacity: initialFaded ? 1 : 0,
    config: { duration: 1000 },
  });

  const setTrack = index => {
    changeFaded(false);
    setTimeout(() => changeTrack(index), 1000);
    setTimeout(() => changeFaded(true), 1000);
    setTimeout(() => audioTag.current.load(), 1000);
    setTimeout(() => audioTag.current.play(), 1000);
    setTimeout(() => setInputValue(0), 1000);
    if (!navigator()) setTimeout(() => setPlayPauseIndex(3), 1000);
    else setTimeout(() => setPlayPauseIndex(7), 1000);
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
    config: { duration: 14500 / allContentfulSingle.edges.length },
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
          <animated.h1 className={classes.singlesHeader} style={{ color: 'white', ...initialFade }}>
            Singles
          </animated.h1>
        </Grid>
      </Grid>
      <animated.hr className={classes.lineDivide} style={initialFade} />
      <Grid item>
        <div>
          <br/>
          <animated.div style={{ textAlign: "center", ...fade }}>
            <h1>{allContentfulSingle.edges[currentTrack].node.trackName}</h1>
          </animated.div>
          <animated.div style={{ textAlign: "center", userSelect: "none", ...initialFade }}>
            {/* 
                shuffleButton that changes shuffleIndex thus alters operations of
                "onEnded" attribute on audio player
            */}
          <img
            onClick={() => {
              if (!navigator()) {
                if (shuffleIndex != shuffleIcons.length - 2) setShuffleIndex(shuffleIndex + 1);
                else {
                  setShuffleIndex(2);
                  // setting shuffle back to off will in turn clear the myMap hash map containing
                  // the track indices and then refill them to full, thus restarting the "shuffle session."
                  myMap.clear();
                  for (let i in allContentfulSingle.edges)
                    myMap.set(i, i);
                }
              }
            }}
            // onMouseEnter and onMouseLeave alters the shuffleIndex state
            // which affects which source file is used in src attribute (see below);
            // In addition, the imported navigator() function checks if the device is
            // a phone or tablet and ends the process if so since there is no mouse to hover
            // on a phone or tablet
            onMouseEnter={() => {
              if (!navigator()) {
                if (shuffleIndex === 0) {
                  setShuffleIndex(2)
                } else if (shuffleIndex === 1) {
                  setShuffleIndex(3)
                }
              }
            }}
            onMouseLeave={() => {
              if (!navigator()) {
                if (shuffleIndex === 2) {
                  setShuffleIndex(0)
                } else if (shuffleIndex === 3) {
                  setShuffleIndex(1)
                }
              }
            }}
            onMouseDown={() => {
              if (!navigator()) {
                if (shuffleIndex === 2) {
                  setPreviousShuffleIndex(shuffleIndex);
                  setShuffleIndex(0);
                } else if (shuffleIndex === 3) {
                  setPreviousShuffleIndex(shuffleIndex);
                  setShuffleIndex(4);
                }
              }
            }}
            onMouseUp={() => {
              if (!navigator()) setShuffleIndex(previousShuffleIndex);
            }}
            onTouchStart={() => {
              if (shuffleIndex === 2) setShuffleIndex(0);
              else if (shuffleIndex === 1) setShuffleIndex(4);
            }}
            onTouchEnd={() => {
              if (shuffleIndex === 0) setShuffleIndex(1);
              else if (shuffleIndex === 4) setShuffleIndex(2);
            }}
            title={shuffleIndex === 2 ? 'Shuffle' : 'Don\'t shuffle'}
            src={shuffleIcons[shuffleIndex].node.secure_url}
            style={{ width: '40px', marginBottom: '18px' }}
            draggable={false}
          />
          <img 
            onClick={() => {
              if (audioTag.current.currentTime >= 3) {
                if (!audioTag.current.paused) {
                  setInputValue(0);
                  audioTag.current.load();
                  audioTag.current.play();
                } else {
                  setInputValue(0);
                  audioTag.current.load();
                }
              } else if (shuffleIndex === 1) {
                if (repeatIndex === 2) setRepeatIndex(1);
                shuffleFunction();
              } else if (currentTrack === 0) {
                if (repeatIndex === 2) setRepeatIndex(1);
                
                if (repeatIndex === 1) {
                  changeTrack(allContentfulSingle.edges.length - 1);
                  audioTag.current.load();
                  audioTag.current.play();
                  if (!navigator()) {
                    setPlayPauseIndex(3)
                  } else {
                    setPlayPauseIndex(7);
                  }
                } else if (repeatIndex === 0 || repeatIndex === 3) {
                  setInputValue(0);
                  audioTag.current.load();
                  audioTag.current.play();
                }
              } else {
                if (repeatIndex === 2) setRepeatIndex(1);
                changeTrack(currentTrack - 1);
                audioTag.current.load();
                audioTag.current.play()
                if (!navigator()) {
                  setPlayPauseIndex(3)
                } else {
                  setPlayPauseIndex(7);
                }
              }
            }}
            title='Previous'
            src={leftTrackIcons[leftTrackIndex].node.secure_url}
            className={classes.trackChange}
            draggable={false}
            onMouseEnter={() => !navigator() && setLeftTrackIndex(1)}
            onMouseLeave={() => !navigator() && setLeftTrackIndex(0)}
            onMouseDown={() => !navigator() && setLeftTrackIndex(0)}
            onMouseUp={()=> !navigator() && setLeftTrackIndex(1)}
            onTouchStart={() => setLeftTrackIndex(0)}
            onTouchEnd={() => setLeftTrackIndex(1)}
          />
          <img
            title={playing ? 'Pause' : 'Play'}
            style={{ width: "60px", margin: "0px" }}
            src={playPauseIcons[playPauseIndex].node.secure_url}
            onClick={() => {
              if (audioTag.current.paused) {
                audioTag.current.play();
                setPlaying(true);
              } else {
                audioTag.current.pause();
                setPlaying(false);
              }
            }}
            draggable={false}
            onMouseEnter={() => {
              if (!navigator()) playing ? setPlayPauseIndex(4) : setPlayPauseIndex(1)
            }}
            onMouseLeave={() => {
              if (!navigator()) playing ? setPlayPauseIndex(3) : setPlayPauseIndex(0)
            }}
            onMouseDown={() => {
              if (!navigator()) playing ? setPlayPauseIndex(5) : setPlayPauseIndex(2)
            }}
            onMouseUp={() => {
              if (!navigator()) playing ? setPlayPauseIndex(1) : setPlayPauseIndex(4)
            }}
            onTouchStart={() => {
              if (playPauseIndex === 6) setPlayPauseIndex(2);
              if (playPauseIndex === 7) setPlayPauseIndex(5);
            }}
            onTouchEnd={() => {
              if (playPauseIndex === 2) setPlayPauseIndex(7);
              if (playPauseIndex === 5) setPlayPauseIndex(6);
            }}
          />
          <img 
            onClick={() => {
              if (repeatIndex === 2) setRepeatIndex(1);

              if (shuffleIndex === 1) {
                shuffleFunction() 
              } else if (currentTrack === allContentfulSingle.edges.length - 1) {
                changeTrack(0);
                if (repeatIndex === 0 || repeatIndex === 3) {
                  audioTag.current.load();
                  audioTag.current.pause();
                  setPlaying(false);
                  setInputValue(0);
                  if (!navigator()) setPlayPauseIndex(0);
                  else setPlayPauseIndex(6);
                } else {
                  audioTag.current.load();
                  audioTag.current.play();
                  if (!navigator()) setPlayPauseIndex(3);
                  else setPlayPauseIndex(7)
                }
              } else {
                changeTrack(currentTrack + 1);
                audioTag.current.load();
                audioTag.current.play();
                setInputValue(0);
                if (!navigator()) setPlayPauseIndex(3);
                else setPlayPauseIndex(7);
              }
            }}
            title='Next'
            src={rightTrackIcons[rightTrackIndex].node.secure_url}
            className={classes.trackChange}
            draggable={false}
            onMouseEnter={() => !navigator() && setRightTrackIndex(1)}
            onMouseLeave={() => !navigator() && setRightTrackIndex(0)}
            onMouseDown={()=> !navigator() && setRightTrackIndex(0)}
            onMouseUp={()=> !navigator() && setRightTrackIndex(1)}
            onTouchStart={() => setRightTrackIndex(0)}
            onTouchEnd={() => setRightTrackIndex(1)}
          />
          {/* 
              Loop button that is responsible for dictating behavior of
              onEnded parameter for audio player
          */}
          <img
            onClick={() => {
              if (!navigator()) {
                if (repeatIndex != repeatIcons.length - 3) setRepeatIndex(repeatIndex + 1);
                else setRepeatIndex(3);
              }
            }}
            // onMouseEnter and onMouseLeave alters repeatIndex state
            // which affects which source file is used in src attribute (see below)
            // In addition, the imported navigator() function checks if the device is
            // a phone or tablet and ends the process if so since there is no mouse to hover
            // on a phone or tablet
            onMouseEnter={() => {
              if (!navigator()) {
                if (repeatIndex === 0) {
                  setRepeatIndex(3);
                } else if (repeatIndex === 1) {
                  setRepeatIndex(4);
                } else if (repeatIndex === 2) {
                  setRepeatIndex(5);
                }
              }
            }}
            onMouseLeave={() => {
              if (!navigator()) {
                if (repeatIndex === 3) {
                  setRepeatIndex(0)
                } else if (repeatIndex === 4) {
                  setRepeatIndex(1)
                } else if (repeatIndex === 5) {
                  setRepeatIndex(2)
                }
              }
            }}
            onMouseDown={() => {
              if (!navigator()) {
                if (repeatIndex === 3) {
                  setPreviousRepeatIndex(repeatIndex);
                  setRepeatIndex(0);
                } else if (repeatIndex === 4) {
                  setPreviousRepeatIndex(repeatIndex);
                  setRepeatIndex(6);
                } else if (repeatIndex === 5) {
                  setPreviousRepeatIndex(repeatIndex);
                  setRepeatIndex(7);
                }
              }
            }}
            onMouseUp={() => {
              if (!navigator()) setRepeatIndex(previousRepeatIndex);
            }}
            onTouchStart={() => {
              if (repeatIndex === 3) setRepeatIndex(0);
              else if (repeatIndex === 1) setRepeatIndex(6);
              else if (repeatIndex === 2) setRepeatIndex(7);
            }}
            onTouchEnd={() => {
              if (repeatIndex === 0) setRepeatIndex(1);
              else if (repeatIndex === 6) setRepeatIndex(2);
              else if (repeatIndex === 7) setRepeatIndex(3);
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
          </animated.div>
          <animated.div style={{ textAlign: "center", ...initialFade }}>
            <span style={{ userSelect: "none" }}>{formatTrackDuration(inputValue)}</span>
            <span>
              <img
                className={classNames(`${classes.loadingWheelGeneral}`, {
                  [classes.loadingWheelVisible]: !audioTag?.current?.paused && !dataFullyLoaded && loadTakingTooLong,
                })}
                src="https://media3.giphy.com/media/3o7TKtnuHOHHUjR38Y/source.gif"
              />
            </span>
            <input
              type='range'
              min={0}
              max={allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0].duration}
              onMouseDown={() => {
                if (!navigator()) {
                  setInputMouseIsDown(true);
                  setPreviousPlayerStatePaused(audioTag.current.paused);
                }
              }}
              onMouseUp={() => {
                if (!navigator()) {
                  setInputMouseIsDown(false);
                  if (!previousPlayerStatePaused) {
                    audioTag.current.play();
                    setPlayPauseIndex(3);
                  }
                }
              }}
              onTouchStart={() => {
                setInputMouseIsDown(true);
                setPreviousPlayerStatePaused(audioTag.current.paused);
              }}
              onTouchEnd={() => {
                setInputMouseIsDown(false);
                if (!previousPlayerStatePaused) {
                  audioTag.current.play();
                  setPlayPauseIndex(7);
                }
              }}
              onChange={e => {
                audioTag.current.pause();
                setInputValue(parseInt(e.target.value));
                audioTag.current.currentTime = e.target.value;
              }}
              value={inputValue}/>
            <span onClick={() => setTimeFormat(!timeFormat)} style={{ userSelect: "none", marginLeft: "22px" }}>{!timeFormat ? ` ${(formatTrackDuration(allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0].duration))}` : allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0].duration - inputValue <= 0 ? "-0:00" : ("-" + formatTrackDuration(allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0].duration - inputValue))}</span>
          </animated.div>
          <audio
            onLoadedData={() => setDataFullyLoaded(true)}
            ref={audioTag}
            className={classes.audioPlayer}
            style={{ display: "none" }}
            onPlay={() => {
              setPlaying(true);
            }}
            onPause={() => {
              setPlaying(false);
            }}
            onEnded={() => onEndedFunction()}
            controls
          >
            <source
              src={allContentfulSingle.edges[currentTrack].node.cloudinaryAudio[0]
                .secure_url}
              type="audio/mp3"
            />
            Your browser does not support the audio element.
          </audio>
        </div>
      </Grid>
      {!navigator() ? (
        <Grid container style={{ marginTop: '120px', paddingBottom: '80px' }}>
          <animated.section id="special" style={{ ...initialFade }}>
          {allContentfulSingle.edges.map((props: object, index: number) => {
              let { node: track } = allContentfulSingle.edges[index];
              let zIndex = allContentfulSingle.edges.length - index;
              return (
                <animated.span key={track.trackName}>
                  <AlbumCoverRotated
                    albumCoverRef={albumCover}
                    track={track}
                    index={index}
                    zIndex={zIndex}
                    inputMouseIsDown={inputMouseIsDown}
                    previousPlayerStatePaused={previousPlayerStatePaused}
                    albumCoverIsHovered={albumCoverIsHovered}
                    setAlbumCoverIsHovered={setAlbumCoverIsHovered}
                    currentTrack={currentTrack}
                    setTrack={setTrack}
                    audio={audioTag.current}
                  />
                </animated.span>
              )
            })}
          </animated.section>
        </Grid>
      ) : (
        <Grid container className={classes.trackNameContainer}>
          <Grid item>
            <animated.div style={fade}>
              <img
                className={classes.singleCover}
                src={
                  allContentfulSingle.edges[currentTrack].node.cloudinaryImage[0]
                    .secure_url
                }
              />
            </animated.div>
          </Grid>
          <Grid item className={classes.trackLines}>
           {/* Loops through tracks stored in Contentful and runs React Spring animation on them */}
           {trail.map((props: object, index: number) => {
             let { node: track } = allContentfulSingle.edges[index];
             return (
               <animated.div key={track.trackName} style={props}>
                 <TrackLine
                   audioTag={audioTag}
                   playPauseIcons={playPauseIcons}
                   soundIcons={soundIcons}
                   currentTrack={currentTrack}
                   setTrack={setTrack}
                   playing={playing}
                   track={track}
                   index={index}
                 />
               </animated.div>
             );
           })}
          </Grid>
        </Grid>
      )
    }
    </main>
  );
};

export default Singles;
