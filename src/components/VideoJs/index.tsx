import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

const VideoJs = ({ videoSrc, index, videoIndex, setVideoIndex, videoPoster }) => {
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
    </div>
  );
};

export default VideoJs;
