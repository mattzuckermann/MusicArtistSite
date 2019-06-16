import React from 'react';
import Grid from '@material-ui/core/Grid';
import HeaderImage from '../HeaderImage';
import {
  faInstagram,
  faSpotify,
  faSoundcloud,
  faBandcamp,
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
      <Grid container spacing={24}>
        <Grid item sm={1} xs={2}>
          <NavColumn groupType="solo">
            <IconListItem
              link="https://www.instagram.com/joshzuckermann/"
              icon={faInstagram}
            />
            <IconListItem
              link="https://open.spotify.com/artist/0hRWyQpSxQ8DxcTTCPC33J?si=rOVcTrdtQVy5yfaTQ7IkkA"
              icon={faSpotify}
            />
            <IconListItem
              link="https://soundcloud.com/josh-zuckermann-867378017"
              icon={faSoundcloud}
            />
          </NavColumn>
        </Grid>
        <Grid item sm={10} xs={8}>
          <h1 className="navList listImage" style={{ margin: 0 }}>
            <HeaderImage style={{ width: 125 }} />
          </h1>
        </Grid>
        <Grid item sm={1} xs={2}>
          <NavColumn groupType="groups">
            <IconListItem
              link="https://www.instagram.com/cardclubband/"
              icon={faInstagram}
            />
            <IconListItem
              link="https://open.spotify.com/artist/17MMFjyHC8KZjcFxx06DFh?si=PaCTf9sqSb6zU7A7hM5Axw"
              icon={faSpotify}
            />
            <IconListItem
              link="https://johnnycilantro6tet.bandcamp.com"
              icon={faBandcamp}
            />
          </NavColumn>
        </Grid>
      </Grid>
      <hr className="hrLine" />
      <ul>
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
