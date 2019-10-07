import React from 'react';

export const YouTubeVideo = () => {
  return (
    <div>
      <iframe
        className="videoPlayback"
        width="528"
        height="297"
        src="https://www.youtube.com/embed/nIds3reW_dY?rel=0"
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
      />
    </div>
  );
};
