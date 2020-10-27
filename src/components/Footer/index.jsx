import React, { useState, useEffect } from 'react';
import { useSpring, animated, config } from 'react-spring';
import {
  faInstagram,
  faSpotify,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.css';

const Footer = () => {
  const [on, toggle] = useState(false);
  const fadeIn = useSpring({
    opacity: on ? 1 : 0,
    config: config.molasses,
  });

  useEffect(() => {
    toggle(true);
  }, []);

  return (
    <animated.footer className="footerBody">
      <div style={fadeIn}>
        <div style={{ height: '130px' }}>
          <a
            className="footerLinks"
            href="https://open.spotify.com/artist/0hRWyQpSxQ8DxcTTCPC33J?si=rOVcTrdtQVy5yfaTQ7IkkA"
            style={{ color: '#b3b3b3' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faSpotify}
              style={{
                border: '1px solid #807474',
                fontSize: '50px',
                margin: '45px 20px',
                borderRadius: '100px',
                padding: '7px',
              }}
            />
          </a>
          <a
            className="footerLinks"
            href="https://www.instagram.com/joshzuckermann/"
            style={{ color: '#b3b3b3' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              style={{
                border: '1px solid #807474',
                fontSize: '50px',
                margin: '45px 20px',
                borderRadius: '100px',
                padding: '7px',
              }}
            />
          </a>
          <a
            className="footerLinks"
            href="https://www.facebook.com/profile.php?id=1330928786"
            style={{ color: '#b3b3b3' }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              style={{
                border: '1px solid #807474',
                fontSize: '50px',
                margin: '45px 20px',
                borderRadius: '100px',
                padding: '7px',
              }}
            />
          </a>
        </div>
        <hr className="hrLine" />
        <div className="copyright">
          Copyright ©{new Date().getFullYear()} Josh Zuckermann. All Rights Reserved.
        </div>
      </div>
    </animated.footer>
  )
}

export default Footer;
