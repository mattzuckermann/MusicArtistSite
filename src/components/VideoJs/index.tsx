import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css';
import '@videojs/themes/dist/forest/index.css';

const VideoJs = props => {
  const { videoSrc, videoPoster } = props;
  const playerRef = useRef(null);

  useEffect(() => {
    const player = videojs(playerRef.current, {}, () => {
      player.src(videoSrc);
      player.on('ended', () => {
        player.handleTechLoadStart_();
        player.hasStarted(false);
        player.exitFullscreen();
      });
    });
    return () => {
      player.dispose();
    };
  }, []);

  return (
    <div data-vjs-player style={{ marginBottom: '25px', borderRadius: '35px' }}>
      <video
        ref={playerRef}
        className=" video-js vjs-theme-forest vjs-16-9"
        controls
        poster={videoPoster}
      />
    </div>
  );
};

export default VideoJs;
