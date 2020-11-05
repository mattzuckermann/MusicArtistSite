import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles } from '@material-ui/styles';
import FooterIcon from '../FooterIcon';
import navigator from '../../js/navigator';
import './footer.css';

const useStyles = makeStyles({
  mediaIconWrapper: {
    height: '130px',
    '@media(max-width: 614px)': {
      height: '150px',
    },
  },
  copyright: {
    paddingTop: '9px',
    color: '#585858',
    '@media(max-width: 420px)': {
      fontSize: '11px',
    },
    '@media(max-width: 330px)': {
      fontSize: '10px',
    },
  },
});

const Footer = () => {
  const classes = useStyles();
  const [on, toggle] = useState(false);
  const fadeIn = useSpring({
    opacity: on ? 1 : 0,
    config: config.molasses,
  });

  const links = [
    'https://open.spotify.com/artist/0hRWyQpSxQ8DxcTTCPC33J?si=rOVcTrdtQVy5yfaTQ7IkkA',
    'https://www.instagram.com/joshzuckermann/',
    'https://www.tiktok.com/@joshzuckermann',
    'https://www.facebook.com/profile.php?id=1330928786',
    'https://twitter.com/ZuckermannJosh',
    'https://soundcloud.com/josh-zuckermann-867378017',
  ];

  useEffect(() => {
    toggle(true);
  }, []);

  const { allCloudinaryMedia } = useStaticQuery(graphql`
    query iconsQuery {
      allCloudinaryMedia(
        sort: { order: ASC, fields: created_at }
        filter: { format: { eq: "png" } }
        skip: 27
        limit: 12
      ) {
        edges {
          node {
            id
            secure_url
          }
        }
      }
    }
  `);

  return (
    <animated.footer className="footerBody">
      <div style={fadeIn}>
        <div className={classes.mediaIconWrapper}>
          {links.map((link, index) => (
            <FooterIcon
              key={link}
              allCloudinaryMedia={allCloudinaryMedia}
              link={link}
              unhighlightedIndex={
                !navigator() ? index + index : index + index + 1
              }
              highlightedIndex={
                !navigator() ? index + index + 1 : index + index
              }
            />
          ))}
        </div>
        <hr className="hrLine" />
        <div className={classes.copyright}>
          Copyright ©{new Date().getFullYear()} Josh Zuckermann. All Rights
          Reserved.
        </div>
      </div>
    </animated.footer>
  );
};

export default Footer;
