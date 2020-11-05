import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
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
  },
});

const SlideAnimation = ({ hoverChange, hoverAnimation, animated }) => {
  const classes = useStyles();
  return (
    <div>
      <animated.div
        onMouseEnter={() => hoverChange(true)}
        onMouseLeave={() => hoverChange(false)}
        className={classes.slideInDesc}
        style={hoverAnimation}
      >
        Debut album coming soon
      </animated.div>
    </div>
  );
};

export default SlideAnimation;
