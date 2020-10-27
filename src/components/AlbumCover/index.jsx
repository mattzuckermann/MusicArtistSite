import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import navigator from '../../js/navigator';
import SlideAnimation from '../SlideAnimation';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  repoImages: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    boxShadow: '8px 8px 3px 0px rgba(0, 0, 0, 0.75)',
  },
  albumImageWrapper: {
    position: 'relative',
    margin: '0px 25%',
    '@media(max-width: 1305px)': {
      margin: '0px 20%',
    },
    '@media(max-width: 1200px) and (min-height: 1000px)': {
      margin: '0px 11%',
    },
    '@media(max-width: 959px)': {
      margin: '0px 20%',
    },
    '@media(max-width: 750px)': {
      margin: '0px 11%',
    },
  },
  slideInDesc: {
    width: '100%',
    position: 'absolute',
    top: '30%',
    textAlign: 'center',
    padding: '15px',
    fontSize: '20px',
    webkitTextStroke: 'black 0px',
    backgroundColor: 'black',
    border: 'white solid 2px',
    color: 'white',
    opacity: '0.8',
  },
});

const AlbumCover = ({ contentfulAlbum, setComponentLoaded, fade }) => {
  const classes = useStyles();
  const [mouseIn, hoverChange] = useState(false);
  const hoverAnimation = useSpring({
    opacity: mouseIn ? 0.9 : 0,
    transform: mouseIn ? 'scale(1, 1)' : 'scale(0.2,0.2)',
  });

  useEffect(() => {
    setComponentLoaded(true);
  });

  return (
    <animated.div style={fade}>
      <div className={classes.albumImageWrapper}>
        <img
          onMouseEnter={() => hoverChange(true)}
          onMouseLeave={() => hoverChange(false)}
          className={classes.repoImages}
          src={contentfulAlbum.coverArt.file.url}
          alt="Time"
        />
        {!navigator() ? (
          <SlideAnimation
            hoverChange={hoverChange}
            hoverAnimation={hoverAnimation}
            animated={animated}
          />
        ) : (
          <div className={classes.slideInDesc}>
            <div style={{ fontFamily: 'futura, sans-serif' }}>
              Debut album coming November 2020
            </div>
          </div>
        )}
      </div>
    </animated.div>
  );
};

export default AlbumCover;
