import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import navigator from '../../js/navigator'

const TrackLine = ({
  playPauseIcons,
  soundIcons,
  classes,
  currentTrack,
  setTrack,
  playing,
  track,
  index,
}) => {

  const minutes = Math.floor(track.cloudinaryAudio[0].duration / 60);
  const minutesFormatted = minutes < 10 ? `${minutes}` : minutes;
  const seconds = Math.floor(track.cloudinaryAudio[0].duration % 60);
  const secondsFormatted = seconds === 0 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
  const trackDuration = `${minutesFormatted}:${secondsFormatted}`;

  const [sourceObject, setSourceObject] = useState(playPauseIcons[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    if (!navigator()) {
      if (currentTrack === index && playing) setSourceObject(soundIcons[1]);
      else if (currentTrack === index && !playing) setSourceObject(soundIcons[0]);
      else if (isHovered && isMouseDown) setSourceObject(playPauseIcons[2])
      else if (isHovered) setSourceObject(playPauseIcons[1]);
      else setSourceObject(playPauseIcons[0]);
    } else {
      if (currentTrack === index && playing) setSourceObject(soundIcons[1]);
      else if (currentTrack === index && !playing) setSourceObject(soundIcons[0]);
      else if (isTouched) setSourceObject(playPauseIcons[0]);
      else setSourceObject(playPauseIcons[1]);
    }
  }, [currentTrack, playing, isHovered, isTouched, isMouseDown]);

  return (
    <div style={{ margin: "0px 0px"}}>
        <img
          src={sourceObject.node.secure_url}
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
          style={{
            width: '25x',
            height: '25px',
            margin: '0px',
          }}
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
        className={classNames(`${classes.trackButton}`, {
          [classes.trackGreen]: currentTrack === index,
        })}
        style={{ fontSize: '13px' }}
      >
        {index + 1}.
      </span>
      <span
        // Checking if track is currently in queue, and responding with altered css
        className={classNames(`${classes.trackButton}`, {
          [classes.trackGreen]: currentTrack === index,
        })}
        style={{ marginLeft: '4px', fontSize: '18px' }}
      >
        {track.trackName} -
      </span>
      <span
        // Checking if track is currently in queue, and responding with altered css
        className={classNames(`${classes.trackDuration}`, {
          [classes.trackGreen]: currentTrack === index,
        })}
      >
        {trackDuration}
      </span>
    </div>
  );
};

export default TrackLine;
