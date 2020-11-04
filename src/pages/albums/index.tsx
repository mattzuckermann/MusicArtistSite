import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import AlbumCover from '../../components/AlbumCover';
import CountdownTimer from '../../components/CountdownTimer'
import moment from 'moment-timezone'
import { graphql, useStaticQuery } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  bioTitle: {
    fontSize: '45px',
    padding: '0px 25px',
    '@media(max-width: 959px)': {
      padding: '0px 45px',
    },
  },
  lineDivide: {
    height: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    backgroundColor: 'white',
    '@media(max-width: 959px)': {
      marginLeft: '30px',
      marginRight: '30px',
    },
  },
});

const Album = () => {
  const classes = useStyles();
  const [width, setWidth] = useState(null);
  const [componentLoaded, setComponentLoaded] = useState(false);

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { allContentfulAlbum } = useStaticQuery(graphql`
    {
      allContentfulAlbum {
        edges {
          node {
            id
            albumTitle
            coverArt {
              id
              file {
                url
              }
            }
          }
        }
      }
    }
  `);

  const awaitedTime = moment.tz("2020-11-20 00:00", "America/New_York").add(1, 'seconds');

  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 700 },
  });

  return (
    <animated.div style={fade}>
      <SEO title="Albums" keywords={[`music`, `album`, `react`]} />
      <h1 className={classes.bioTitle}>{ width > 406 ? 'Discography' : 'Discog'}</h1>
      <hr className={classes.lineDivide} />
      {moment().isBefore(awaitedTime) ? <CountdownTimer awaitedTime={awaitedTime} /> : <div/>}
      <div style={{ height: !componentLoaded ? '55vh' : '100%', marginTop: '25px' }}>
        {allContentfulAlbum.edges.map((album, index) => (
            <AlbumCover key={index} contentfulAlbum={album.node} setComponentLoaded={setComponentLoaded} fade={fade} />
        ))}
      </div>
    </animated.div>
  );
};

export default Album;
