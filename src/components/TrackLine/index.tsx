import React from 'react';
import classNames from 'classnames';

const TrackLine = ({
  allCloudinaryMedia,
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
  const secondsFormatted = seconds === 0 ? '00' : seconds;
  const trackDuration = `${minutesFormatted}:${secondsFormatted}`;
  return (
    <div>
      <button
        className={classNames(
          `${classes.buttonGeneral} ${classes.buttonPaused}`,
          {
            [classes.buttonPlaying]: currentTrack === index,
          }
        )}
        onClick={() => {
          if (currentTrack !== index) {
            setTrack(index);
          }
        }}
      >
        <img
          src={
            currentTrack === index && playing
              ? allCloudinaryMedia.edges[1].node.secure_url
              : allCloudinaryMedia.edges[0].node.secure_url
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
