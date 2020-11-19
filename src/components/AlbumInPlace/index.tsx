import React from 'react';

const index = ({ albumName, slideInDesc, albumOutNow, tapToListen }) => {
  return (
    <div className={slideInDesc}>
      <div>
        <div className={albumOutNow}>
          <i>{albumName}</i> out now!
        </div>
        <div className={tapToListen}>(Tap Cover Art To Listen)</div>
      </div>
    </div>
  );
};

export default index;
