import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import navigator from '../../navigator';

const NavTab = ({ children, link, location }) => {
  const [pathName, setPathName] = useState({});
  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);
  return (
    <li className="navList">
      <Link
        to={link}
        className={classNames('navList', {
          navListHover: !navigator(),
        })}
        style={
          pathName === link || pathName === `${link}/` ? { color: 'white' } : {}
        }
      >
        {children}
      </Link>
    </li>
  );
};

export default NavTab;
