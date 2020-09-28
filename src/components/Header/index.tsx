import React from 'react';
import Grid from '@material-ui/core/Grid';
import HeaderImage from '../HeaderImage';
import {
  faInstagram,
  faSpotify,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import IconListItem from '../IconListItem';
import NavTab from '../NavTab';
import NavColumn from '../NavColumn';
import PropTypes from 'prop-types';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  header: {
    background: `#1a1a1a`,
    marginBottom: `1.45rem`,
    overflow: 'hidden',
  },
});

const Header = ({ location }) => {
  const classes = useStyles();
  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 300 },
  });
  return (
    <animated.header style={fade} className={`text-center ${classes.header}`}>
      <Grid container>
        <Grid item md={1} sm={2} xs={2}>
          <NavColumn>
            <IconListItem
              link="https://open.spotify.com/artist/0hRWyQpSxQ8DxcTTCPC33J?si=rOVcTrdtQVy5yfaTQ7IkkA"
              icon={faSpotify}
            />
            <IconListItem
              link="https://www.instagram.com/joshzuckermann/"
              icon={faInstagram}
            />
            <IconListItem
              link="https://www.facebook.com/profile.php?id=1330928786"
              icon={faFacebook}
            />
          </NavColumn>
        </Grid>
        <Grid item md={10} sm={8} xs={8}>
          <h1 className="navList listImage" style={{ margin: 0 }}>
            <HeaderImage style={{ width: 125 }} />
          </h1>
        </Grid>
      </Grid>
      <hr className="hrLine" />
      <ul className="navRow">
        <NavTab location={location} link="/">
          HOME
        </NavTab>
        <NavTab location={location} link="/about">
          ABOUT
        </NavTab>
        <NavTab location={location} link="/singles">
          SINGLES
        </NavTab>
        <NavTab location={location} link="/albums">
          ALBUMS
        </NavTab>
      </ul>
    </animated.header>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
