import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const TrackLine = ({
  allCloudinaryMedia,
  classes,
  currentTrack,
  setTrack,
  playing,
  setPlaying,
  track,
  index,
}) => {
  const minutes = Math.floor(track.cloudinaryAudio[0].duration / 60);
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = Math.floor(track.cloudinaryAudio[0].duration % 60);
  const secondsFormatted = seconds === 0 ? '00' : seconds;
  const trackDuration = `${minutesFormatted}:${secondsFormatted}`;
  return (
    <div>
      <button
        className={classNames(
          `${classes.buttonGeneral} ${classes.buttonPaused}`,
          {
            [classes.buttonPlaying]: currentTrack === index && playing,
          }
        )}
        onClick={() => {
          if (currentTrack !== index) setTrack(index);
          if (currentTrack === index) {
            setPlaying(!playing);
          }
        }}
      >
        <img
          src={
            currentTrack === index && playing
              ? allCloudinaryMedia.edges[1].node.url
              : allCloudinaryMedia.edges[0].node.url
          }
          style={{
            width: '10px',
            height: '10px',
            margin: '0px',
          }}
          draggable={false}
          alt="play-button"
        />
      </button>
      <span
        // Checking if track is currently in queue, and responding with altered css
        className={classNames(`${classes.trackButton}`, {
          [classes.trackGreen]: currentTrack === index,
        })}
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
