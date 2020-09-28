import React from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import navigator from '../../js/navigator';

const useStyles = makeStyles({
  divTabletLaptop: {
    position: 'relative',
    top: '-300px',
    left: '-30px',
    height: '1091px',
  },
  divPhone: {
    position: 'relative',
    top: '-105px',
    left: '0px',
    height: '1650px',
  },
  iframeTabletLaptop: {
    width: '1000px',
    height: '100%',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
  },
  iframePhone: {
    width: '100%',
    height: '100%',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
  },
});

const Index = () => {
  const classes = useStyles();
  return (
    <div
      // classnames package checking what device is rendering iFrame and responding
      // accordingly with proper CSS.
      className={classNames('', {
        [classes.divTabletLaptop]:
          !navigator() || (navigator() && screen.width >= 700),
        [classes.divPhone]: navigator() && screen.width < 700,
      })}
    >
      <iframe
        // classnames package checking what device is rendering iFrame and responding
        // accordingly with proper CSS.
        className={classNames('', {
          [classes.iframeTabletLaptop]:
            !navigator() || (navigator() && screen.width >= 700),
          [classes.iframePhone]: navigator() && screen.width < 700,
        })}
        scrolling="no"
        title="bandcamp"
        src="https://johnnycilantro6tet.bandcamp.com/"
      />
    </div>
  );
};

export default Index;
