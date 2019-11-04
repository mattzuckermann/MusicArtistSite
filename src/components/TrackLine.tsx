import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

const TrackLine = ({
  currentTrack,
  index,
  smallPlayButton,
  setTrack,
  allCloudinaryMedia,
  track,
  classes,
  playing,
  setPlaying,
}) => {
  const timeClock = `0${Math.floor(
    track.cloudinary[0].duration / 60
  )}:${Math.floor(track.cloudinary[0].duration % 60)}`;
  return (
    <div>
      <button
        className={classNames(`${classes.audioButton}`, {
          [smallPlayButton]: currentTrack === index && playing,
        })}
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
          alt="play-button"
        />
      </button>
      <span className={classes.trackButton}>{track.name} -</span>
      <span className={classes.timeClock}>{timeClock}</span>
    </div>
  );
};

export default TrackLine;
