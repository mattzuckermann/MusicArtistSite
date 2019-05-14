import React, { Suspense } from 'react';
import {
  faInstagram,
  faSpotify,
  faSoundcloud,
  faBandcamp,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import navigator from '../../navigator';
import HeaderImage from '../HeaderImage';

const Header = () => (
  <header
    style={{
      background: `#1a1a1a`,
      marginBottom: `1.45rem`,
    }}
    className="text-center"
  >
    <Grid container spacing={24}>
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
              className={classNames('icon', {
                iconHover: !navigator(),
              })}
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
              className={classNames('icon', {
                iconHover: !navigator(),
              })}
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
              className={classNames('icon', {
                iconHover: !navigator(),
              })}
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
          <HeaderImage style={{ width: 125 }} />
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
              className={classNames('icon', {
                iconHover: !navigator(),
              })}
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
              className={classNames('icon', {
                iconHover: !navigator(),
              })}
              href="https://open.spotify.com/artist/17MMFjyHC8KZjcFxx06DFh?si=PaCTf9sqSb6zU7A7hM5Axw"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faSpotify} />
            </a>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className={classNames('icon', {
                iconHover: !navigator(),
              })}
              href="https://johnnycilantro6tet.bandcamp.com"
              style={{ color: 'white' }}
            >
              <FontAwesomeIcon icon={faBandcamp} />
            </a>
          </li>
        </ul>
      </Grid>
    </Grid>
    <hr className="hrLine" />
    <ul>
      <li className="navList">
        <Link
          to="/"
          className={classNames('navList', {
            navListHover: !navigator(),
          })}
        >
          HOME
        </Link>
      </li>
      <li className="navList">
        <Link
          to="/about"
          className={classNames('navList', {
            navListHover: !navigator(),
          })}
        >
          ABOUT
        </Link>
      </li>
      <li className="navList">
        <Link
          to="/singles"
          className={classNames('navList', {
            navListHover: !navigator(),
          })}
        >
          SINGLES
        </Link>
      </li>
      <li className="navList">
        <Link
          to="/albums"
          className={classNames('navList', {
            navListHover: !navigator(),
          })}
        >
          ALBUMS
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
