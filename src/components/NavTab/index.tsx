import React from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import navigator from '../../navigator';

const NavTab = ({ children, link, location }) => {
  return (
    <li className="navList">
      <Link
        to={link}
        className={classNames('navList', {
          navListHover: !navigator(),
        })}
        style={location.pathname === link ? { color: 'white' } : {}}
      >
        {children}
      </Link>
    </li>
  );
};

export default NavTab;
