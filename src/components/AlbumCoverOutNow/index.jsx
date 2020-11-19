import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/styles';
import navigator from '../../js/navigator';
import SlideAnimationOutNow from '../SlideAnimationOutNow';
import AlbumInPlace from '../AlbumInPlace';

const useStyles = makeStyles({
  repoImages: {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    border: '2px solid #1b1b1b',
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
    top: '40%',
    textAlign: 'center',
    padding: '15px',
    fontSize: '20px',
    webkitTextStroke: 'black 0px',
    backgroundColor: 'black',
    border: 'white solid 2px',
    color: 'white',
    opacity: '0.8',
    '@media(max-width: 1300px)': {
      top: '35%',
      padding: '30px',
    },
    '@media(max-width: 780px)': {
      top: '35%',
      padding: '20px',
    },
    '@media(max-width: 750px)': {
      top: '35%',
      padding: '15px',
    },
  },
  albumOutNow: {
    fontSize: '20px',
    '@media(max-width: 1300px)': {
      fontSize: '38px',
    },
    '@media(max-width: 780px)': {
      fontSize: '35px',
    },
    '@media(max-width: 750px)': {
      fontSize: '20px',
    },
  },
  tapToListen: {
    fontSize: '15px',
    marginTop: '5px',
    '@media(max-width: 1300px)': {
      fontSize: '23px',
      marginTop: '28px',
    },
    '@media(max-width: 780px)': {
      fontSize: '22px',
      marginTop: '20px',
    },
    '@media(max-width: 750px)': {
      fontSize: '15px',
      marginTop: '0px',
    },
  },
});

const AlbumCoverOutNow = ({ contentfulAlbum, setComponentLoaded, fade }) => {
  const classes = useStyles();
  const { albumTitle, coverArt } = contentfulAlbum;
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
        <Link to={`/albums/${albumTitle.toLowerCase()}`}>
          <img
            onMouseEnter={() => hoverChange(true)}
            onMouseLeave={() => hoverChange(false)}
            className={classes.repoImages}
            src={coverArt.file.url}
            alt={albumTitle}
          />
        </Link>
        {!navigator() ? (
          <Link to={`/albums/${albumTitle.toLowerCase()}`}>
            <SlideAnimationOutNow
              albumName={albumTitle}
              hoverChange={hoverChange}
              hoverAnimation={hoverAnimation}
              animated={animated}
            />
          </Link>
        ) : (
          <Link to={`/albums/${albumTitle.toLowerCase()}`}>
            <AlbumInPlace
              albumName={albumTitle}
              slideInDesc={classes.slideInDesc}
              albumOutNow={classes.albumOutNow}
              tapToListen={classes.tapToListen}
            />
          </Link>
        )}
      </div>
    </animated.div>
  );
};

export default AlbumCoverOutNow;
