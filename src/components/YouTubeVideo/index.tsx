import React from 'react';

const YouTubeVideo = ({ videoLink }) => {
  return (
    <div>
      <iframe
        className="videoPlayback"
        width="528"
        height="297"
        src={videoLink}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      />
    </div>
  );
};

export default YouTubeVideo;
