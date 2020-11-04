import React, { useRef, useEffect } from 'react';

const IFrame = ({ styles, iframeLink, aLink, aDesc }) => {
  const bandcampRef = useRef(null);

  useEffect(() => {
    console.log(bandcampRef.current.contentWindow.document);
  }, []);

  return (
    <>
      <iframe
        ref={bandcampRef}
        title={aDesc}
        className={styles}
        src={iframeLink}
        seamless
      >
        <a href={aLink}>{aDesc}</a>
      </iframe>
    </>
  );
};

export default IFrame;
