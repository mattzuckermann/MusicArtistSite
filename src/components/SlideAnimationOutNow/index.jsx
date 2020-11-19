import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  slideInDesc: {
    width: '100%',
    position: 'absolute',
    top: '35%',
    textAlign: 'center',
    padding: '15px',
    fontSize: '20px',
    webkitTextStroke: 'black 0px',
    backgroundColor: 'black',
    border: 'white solid 2px',
    color: 'white',
    '@media(max-width: 600px)': {
      top: '35%',
    },
  },
  albumOutNow: {
    fontSize: '25px',
    '@media(max-width: 600px)': {
      fontSize: '20px',
    },
  },
  tapToListen: {
    fontSize: '18px',
    marginTop: '8px',
    '@media(max-width: 600px)': {
      marginTop: '5px',
      fontSize: '13px',
    },
  },
});

const SlideAnimation2 = ({
  albumName,
  hoverChange,
  hoverAnimation,
  animated,
}) => {
  const classes = useStyles();
  return (
    <div>
      <animated.div
        onMouseEnter={() => hoverChange(true)}
        onMouseLeave={() => hoverChange(false)}
        className={classes.slideInDesc}
        style={hoverAnimation}
      >
        <div className={classes.albumOutNow}>
          <i>{albumName}</i> out now!
        </div>
        <div className={classes.tapToListen}>(Click Cover Art To Listen)</div>
      </animated.div>
    </div>
  );
};

export default SlideAnimation2;
