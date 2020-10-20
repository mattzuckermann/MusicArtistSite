import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../node_modules/video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

const VideoJs = props => {
  const { videoSrc, index, videoIndex, setVideoIndex, videoPoster, videoCredits } = props;
  const playerRef = useRef(null);

  useEffect(() => {
    const player = videojs(playerRef.current, {}, () => {
      player.src(videoSrc);
      player.on('ended', () => {
        player.hasStarted(false);
        if((window.fullScreen) || (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
          player.exitFullscreen();
        }
        player.handleTechLoadStart_();
      });
    });
    return () => {
      player.dispose();
    };
  }, []);
  
  useEffect(() => {
    if (index !== videoIndex) playerRef.current.pause();
  }, [videoIndex]);

  return (
    <div data-vjs-player style={{ marginBottom: '40px', borderRadius: '35px' }}>
      <video
        ref={playerRef}
        className=" video-js vjs-theme-forest vjs-16-9"
        controls
        poster={videoPoster}
        onPlay={() => {
          setVideoIndex(index);
        }}
      />
      <div style={{ marginTop: '3px', padding: 'auto 0px auto 0px' }}>
        {videoCredits.length != 0 && (
          <caption
            style={{
              float: 'left',
              marginLeft: '10px',
              fontSize: '13px',
            }}
          >
            credits:{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={videoCredits[0].portfolio}
              title="Portfolio"
            >
              {videoCredits[0].name}
            </a>{' '}
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={videoCredits[0].youtube}
              title="YouTube Channel"
              >
              <FontAwesomeIcon
                style={{
                  fontSize: '18px',
                  color: '#f70103',
                  padding: '2px 0px 0px 0px',
                }}
                icon={faYoutube}
              />
            </a>
          </caption>
        )}
      </div>
    </div>
  );
};

export default VideoJs;
