import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import './header.css';
import favicon from '../../images/favicon/favicon.ico';
import HeaderImage from '../../components/HeaderImage';
import Image from '../../components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faSpotify,
  faSoundcloud,
  faBandcamp,
} from '@fortawesome/free-brands-svg-icons';
import Grid from '@material-ui/core/Grid';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#1a1a1a`,
      marginBottom: `1.45rem`,
    }}
    className="text-center"
  >
    <Grid container spacing={12}>
      <Grid item sm={1} xs={2}>
        <ul
          className="iconList"
          style={{ margin: 0, listStyleType: 'none', color: 'white' }}
        >
          <li className="groupSize">
            <u>solo</u>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/joshzuckermann/"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://open.spotify.com/artist/0hRWyQpSxQ8DxcTTCPC33J?si=rOVcTrdtQVy5yfaTQ7IkkA"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faSpotify} />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://soundcloud.com/josh-zuckermann-867378017"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faSoundcloud} />
            </a>
          </li>
        </ul>
      </Grid>
      <Grid item sm={10} xs={8}>
        <h1 className="navList listImage" style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <img
              style={{ width: `125px`, margin: 0 }}
              src={favicon}
              alt="Josh Logo"
            />
          </Link>
        </h1>
      </Grid>
      <Grid item sm={1} xs={2}>
        <ul
          className="iconList"
          style={{ margin: 0, listStyleType: 'none', color: 'white' }}
        >
          <li className="groupSize">
            <u>groups</u>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://johnnycilantro6tet.bandcamp.com"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faBandcamp} />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/cardclubband/"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://open.spotify.com/artist/17MMFjyHC8KZjcFxx06DFh?si=PaCTf9sqSb6zU7A7hM5Axw"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faSpotify} />
            </a>
          </li>
        </ul>
      </Grid>
    </Grid>
    <hr className="hrLine" />
    <ul>
      <li className="navList">
        <Link to="/bio/about" className="navList">
          ABOUT
        </Link>
      </li>
      <li className="navList">
        <Link to="/albums" className="navList">
          ALBUMS
        </Link>
      </li>
      <li className="navList">
        <Link to="/singles" className="navList">
          SINGLES
        </Link>
      </li>
    </ul>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
