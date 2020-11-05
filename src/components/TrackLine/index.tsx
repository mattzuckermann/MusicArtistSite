import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import navigator from '../../js/navigator';

const useStyles = makeStyles(() =>
  createStyles({
    trackLineRow: {
      margin: '9px 0px',
      fontSize: '12px',
      '@media(max-width: 500px)': {
        margin: '12px 0px',
        fontSize: '15px',
      },
      '@media(max-width: 400px)': {
        margin: '11px 0px',
        fontSize: '13px',
      },
    },
    trackLineIndex: {
      marginLeft: '1em',
      fontSize: '1em',
    },
    trackLineButton: {
      height: '2.1em',
      margin: '-0.58em 0px -0.58em 0.41em',
    },
    trackLineName: {
      margin: '-0.58em 0em -0.58em 0.41em',
      marginLeft: '0.33em',
      fontSize: '1.5em',
    },
    trackLineDuration: {
      marginLeft: '0.75em',
      fontSize: '0.91em',
    },
    trackLineGreen: {
      color: '#1ED760',
    },
  })
);

const TrackLine = ({
  playPauseIcons,
  soundIcons,
  currentTrack,
  setTrack,
  playing,
  track,
  index,
}) => {
  const classes = useStyles();

  const minutes = Math.floor(track.cloudinaryAudio[0].duration / 60);
  const minutesFormatted = minutes < 10 ? `${minutes}` : minutes;
  const seconds = Math.floor(track.cloudinaryAudio[0].duration % 60);
  const secondsFormatted =
    seconds === 0 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
  const trackDuration = `${minutesFormatted}:${secondsFormatted}`;

  const [sourceObject, setSourceObject] = useState(playPauseIcons[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    if (!navigator()) {
      if (currentTrack === index && playing) setSourceObject(soundIcons[1]);
      else if (currentTrack === index && !playing)
        setSourceObject(soundIcons[0]);
      else if (isHovered && isMouseDown) setSourceObject(playPauseIcons[2]);
      else if (isHovered) setSourceObject(playPauseIcons[1]);
      else setSourceObject(playPauseIcons[0]);
    } else {
      if (currentTrack === index && playing) setSourceObject(soundIcons[1]);
      else if (currentTrack === index && !playing)
        setSourceObject(soundIcons[0]);
      else if (isTouched) setSourceObject(playPauseIcons[0]);
      else setSourceObject(playPauseIcons[1]);
    }
  }, [currentTrack, playing, isHovered, isTouched, isMouseDown]);

  return (
    <div className={classes.trackLineRow}>
      <img
        src={sourceObject.node.secure_url}
        className={classes.trackLineButton}
        onMouseEnter={() => {
          if (!navigator()) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (!navigator()) {
            setIsHovered(false);
            setIsMouseDown(false);
          }
        }}
        onMouseDown={() => {
          if (!navigator()) setIsMouseDown(true);
        }}
        onMouseUp={() => {
          if (!navigator()) setIsMouseDown(false);
        }}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
        onClick={() => {
          if (currentTrack !== index) {
            setTrack(index);
          }
        }}
        draggable={false}
        alt="play-button"
      />
      <span
        // Checking if track is currently in queue, and responding with altered css
        className={classNames(`${classes.trackLineIndex}`, {
          [classes.trackLineGreen]: currentTrack === index,
        })}
      >
        {index + 1}.
      </span>
      <span
        // Checking if track is currently in queue, and responding with altered css
        className={classNames(`${classes.trackLineName}`, {
          [classes.trackLineGreen]: currentTrack === index,
        })}
      >
        {track.trackName} -
      </span>
      <span
        // Checking if track is currently in queue, and responding with altered css
        className={classNames(`${classes.trackLineDuration}`, {
          [classes.trackLineGreen]: currentTrack === index,
        })}
      >
        {trackDuration}
      </span>
    </div>
  );
};

export default TrackLine;
