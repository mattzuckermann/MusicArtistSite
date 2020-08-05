import React from 'react';

const AlternativeLayout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default AlternativeLayout;
