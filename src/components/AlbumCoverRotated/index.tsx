import React, { useEffect, useState, Fragment } from 'react'
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles({
  albumCoverGeneral: {
    userSelect: 'none',
    cursor: 'pointer',
    position: 'relative',
    borderTop: '4px solid white',
    borderRight: '8px solid white',
    borderBottom: '2px solid white',
    borderLeft: '2px solid white',
    margin: '0px -350px 0px 0px',
    width: '420px',
    height: '420px',
    '@media(max-width: 979px)': {
      margin: '0px -220px 0px 0px',
      width: '300px',
      height: '300px',
    },
    '@media(max-width: 885px)': {
      margin: '0px -200px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 855px)': {
      margin: '0px -205px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 815px)': {
      margin: '0px -210px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 785px)': {
      margin: '0px -215px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 755px)': {
      margin: '0px -220px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 715px)': {
      margin: '0px -225px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 685px)': {
      margin: '0px -230px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 635px)': {
      margin: '0px -235px 0px 0px',
      width: '280px',
      height: '280px',
    },
    '@media(max-width: 605px)': {
      margin: '0px -195px 0px 0px',
      width: '240px',
      height: '240px',
    },
    '@media(max-width: 605px)': {
      margin: '0px -195px 0px 0px',
      width: '240px',
      height: '240px',
    },
    '@media(max-width: 585px)': {
      margin: '0px -198px 0px 0px',
      width: '240px',
      height: '240px',
    },
    '@media(max-width: 565px)': {
      margin: '0px -200px 0px 0px',
      width: '240px',
      height: '240px',
    },
    '@media(max-width: 565px)': {
      margin: '0px -180px 0px 0px',
      width: '220px',
      height: '220px',
    },
    '@media(max-width: 525px)': {
      margin: '0px -183px 0px 0px',
      width: '220px',
      height: '220px',
    },
    '@media(max-width: 500px)': {
      margin: '0px -186px 0px 0px',
      width: '220px',
      height: '220px',
    },
    '@media(max-width: 450px)': {
      margin: '0px -115px 0px 0px',
      width: '150px',
      height: '150px',
    },
    '@media(max-width: 400px)': {
      margin: '0px -120px 0px 0px',
      width: '150px',
      height: '150px',
    },
    '@media(max-width: 370px)': {
      margin: '0px -124px 0px 0px',
      width: '150px',
      height: '150px',
    },
    '@media(max-width: 330px)': {
      margin: '0px -117px 0px 0px',
      width: '140px',
      height: '140px',
    },
  },
  albumCoverOnHover: {
    borderTop: '4px solid #2d38c5',
    borderRight: '8px solid #2d38c5',
    borderBottom: '2px solid #2d38c5',
    borderLeft: '2px solid #2d38c5',
  },
  albumCoverOnQueue: {
    cursor: 'default',
  },
  albumCoverOnPlay: {
    border: "5px solid white",
  },
});

const AlbumCoverRotated = ({ albumCoverRef, track, index, zIndex, inputMouseIsDown, previousPlayerStatePaused, albumCoverIsHovered, setAlbumCoverIsHovered, currentTrack, setTrack, audio }) => {
    const classes = useStyles();
    const [width, setWidth] = useState(null);
    const [offsetValue, setOffsetValue] = useState(`${30}vw`);
    
    useEffect(() => {
      setWidth(window.innerWidth);
      window.addEventListener('resize', () => {
        setWidth(window.innerWidth);
      });
    }, []);
    
    useEffect(() => {
      if (width >= 1550) {
        setOffsetValue('38vw');
      } else if (width >= 1400) {
        setOffsetValue('36vw');
      } else if (width >= 1150) {
        setOffsetValue('31vw');
      } else if (width >= 980) {
        setOffsetValue('30vw');
      } else if (width >= 900) {
        setOffsetValue('33vw');
      } else if (width >= 750) {
        setOffsetValue('31vw');
      } else if (width >= 600) {
        setOffsetValue('28vw');
      } else if (width >= 450 ) {
        setOffsetValue('26vw');
      }
    }, [width]);

    const transition = useSpring({
      opacity: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown) ? 1 : 0.95,
      zIndex: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown) ? 20 : zIndex,
      transform: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown) ? `rotateY(0deg) translateY(${80}px) rotate(0deg)` : `rotateY(60deg) translateY(${-index * 8}px) rotate(8deg)`,
      boxShadow: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown) ? `10px 6px rgba(0, 0, 0, 0.6)` : `40px 4px rgba(0, 0, 0, 0.6)`,
      left: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown) ? `${offsetValue}` : `0%`,
      position: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown) ? `absolute` : `relative`,
      config: { duration: 250 },
    });

    return (
        <Fragment>
            <animated.img
                ref={albumCoverRef}
                style={transition}
                alt={track.trackName}
                title={track.trackName}
                className={classNames(`${classes.albumCoverGeneral}`, {
                  [classes.albumCoverOnQueue]: currentTrack === index,
                  [classes.albumCoverOnHover]: albumCoverIsHovered === index && currentTrack !== index,
                  [classes.albumCoverOnPlay]: (currentTrack === index && !audio?.paused) || (currentTrack === index && previousPlayerStatePaused === false && inputMouseIsDown),
                })}
                onMouseEnter={() => {
                    setAlbumCoverIsHovered(index)
                }}
                onMouseLeave={() => {
                    setAlbumCoverIsHovered(null)
                }}
                onClick={() => {
                  if (currentTrack !== index) {
                    setTrack(index);
                  }
                }}
                draggable={false}
                src={track.cloudinaryImage[0].secure_url}
            />
        </Fragment>
    )
}

export default AlbumCoverRotated
