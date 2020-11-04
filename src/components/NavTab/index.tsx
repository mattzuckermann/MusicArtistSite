import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import navigator from '../../js/navigator';

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
          navTabCursor:
            pathName === `${link}` ||
            pathName === `${link}/` ||
            pathName === `${link}/awakening` ||
            pathName === `${link}/awakening/`,
        })}
        style={
          pathName === `${link}` ||
          pathName === `${link}/` ||
          pathName === `${link}/awakening` ||
          pathName === `${link}/awakening/`
            ? { color: 'white' }
            : {}
        }
      >
        {children}
      </Link>
    </li>
  );
};

export default NavTab;
