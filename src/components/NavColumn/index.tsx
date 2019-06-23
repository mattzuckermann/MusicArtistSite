import React from 'react';

const NavColumn = ({ children, groupType }) => {
  return (
    <ul
      className="iconList"
      style={{ margin: 0, listStyleType: 'none', color: 'white' }}
    >
      <li className="groupSize">
        <u>{groupType}</u>
      </li>
      {children}
    </ul>
  );
};

export default NavColumn;
