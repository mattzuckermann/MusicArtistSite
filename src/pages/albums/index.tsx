import React from 'react';
import SEO from '../../components/SEO';
import AlbumCover from '../../components/AlbumCover';
import { graphql, useStaticQuery } from 'gatsby';
import { useSpring, animated } from 'react-spring';
import { makeStyles } from '@material-ui/styles';
const useStyles = makeStyles({
  bioTitle: {
    fontSize: '45px',
    fontFamily: 'futura',
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
      <h1 className={classes.bioTitle}>Discography</h1>
      <hr className={classes.lineDivide} />
      {allContentfulAlbum.edges.map((album, index) => (
        // <a href="/albums/awakening" rel="noreferrer noopener">
          <AlbumCover contentfulAlbum={album.node} key={index} fade={fade} />
        // </a>
      ))}
    </animated.div>
  );
};

export default Album;
