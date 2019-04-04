import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './style.css';
import joshLogo from '../../images/favicon.png';
import Archive from '../Archive';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <ul>
        <li className="navList listImage">
          <h1 style={{ margin: 0 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              <img style={{ width: `100px` }} src={joshLogo} alt="Josh Logo" />
            </Link>
          </h1>
        </li>
        <li className="navList">
          <Link to="/bio/about" className="navList">
            About Me
          </Link>
        </li>
        <li className="navList">
          <Link to="/albums" className="navList">
            All Albums
          </Link>
        </li>
        <li className="navList">
          <Link to="/albums/rap/debut" className="navList">
            Debut Album
          </Link>
        </li>
        <li className="navList">
          <Link to="/singles/flag" className="navList">
            Flag Single
          </Link>
        </li>
      </ul>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
