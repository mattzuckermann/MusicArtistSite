import React, { useState, useEffect } from 'react';
import SEO from '../../components/SEO';
import AlbumCover from '../../components/AlbumCover';
import CountdownTimer from '../../components/CountdownTimer'
import { graphql, useStaticQuery } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  bioTitle: {
    fontSize: '45px',
    fontFamily: 'futura, sans-serif',
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
      <CountdownTimer />
      <div style={{ height: !componentLoaded ? '55vh' : '100%' }}>
        {allContentfulAlbum.edges.map((album, index) => (
            <AlbumCover key={index} contentfulAlbum={album.node} setComponentLoaded={setComponentLoaded} fade={fade} />
        ))}
      </div>
    </animated.div>
  );
};

export default Album;
