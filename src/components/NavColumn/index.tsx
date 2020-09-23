import React from 'react';

const NavColumn = ({ children }) => {
  return (
    <ul
      className="iconList"
      style={{ margin: 0, listStyleType: 'none', color: 'white' }}
    >
      {children}
    </ul>
  );
};

export default NavColumn;
