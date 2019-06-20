import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core/styles';
import { Image, CloudinaryContext, Transformation } from 'cloudinary-react';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';
import { useTrail, animated } from 'react-spring';
import '../index.css';
import ReactPlayer from 'react-player';

const Audio = ['Reiki', 'Crush', 'Two Weeks'];
const CloudinaryTracks = [
  'https://res.cloudinary.com/joshzuckermann-netlify-com/video/upload/v1560645715/singles/Reiki.mp3',
  'https://res.cloudinary.com/joshzuckermann-netlify-com/video/upload/v1560645717/singles/Crush.mp3',
  'https://res.cloudinary.com/joshzuckermann-netlify-com/video/upload/v1560648543/singles/Two%20Weeks.mp3',
];

const useStyles = makeStyles(() =>
  createStyles({
    SinglesBackgroundColor: {
      backgroundColor: '#fecbd0',
    },
    audioPlayer: {
      width: '270px !important',
      paddingBottom: '30px',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  })
);

const Album = () => {
  const classes = useStyles();
  const [playing, setPlaying] = useState('');
  const [on, toggle] = useState(false);
  const [trail, set, stop] = useTrail(3, () => ({
    transform: 'scale(0.8, 0.8), translate3d(-8%,0,0)',
    opacity: 0,
  }));
  set({
    opacity: on ? 1 : 0,
    transform: on
      ? 'scale(1, 1), translate3d(0,0,0,)'
      : 'scale(0.8,0.8), translate3d(-8%,0,0)',
    config: { duration: 3500 / 4 },
  });
  stop();

  useEffect(() => {
    toggle(true);
  }, []);

  return (
    <div>
      <SEO
        description="visibility improvement"
        title="Album"
        keywords={[`music`, `album`, `react`]}
      />
      <div className="container">
        <div className="row">
          <div>
            <Grid container spacing={24} style={{ textAlign: 'center' }}>
              {trail.map((props, index) => (
                <Grid
                  item
                  style={{
                    borderRadius: 10,
                    margin: '10px 0px 40px 0px',
                  }}
                  key={index}
                  lg={6}
                  md={6}
                  sm={12}
                  xs={12}
                >
                  <animated.div
                    className={`${classes.SinglesBackgroundColor}`}
                    style={props}
                  >
                    <h1
                      style={{
                        padding: '25px 0px',
                        fontFamily: 'futura',
                        borderRadius: 5,
                        backgroundColor: '#fb2f47',
                      }}
                    >
                      {Audio[index]}
                    </h1>
                    <CloudinaryContext
                      includeOwnBody={false}
                      cloudName="joshzuckermann-netlify-com"
                    >
                      <Image
                        publicId={`singlesImages/${Audio[index]}`}
                        format="jpg"
                      >
                        <Transformation
                          crop="fill"
                          gravity="faces"
                          width="300"
                        />
                      </Image>
                      <ReactPlayer
                        className={classes.audioPlayer}
                        height="55px"
                        playing={playing === `${index}`}
                        onPlay={() => setPlaying(`${index}`)}
                        url={CloudinaryTracks[index]}
                        controls
                      />
                    </CloudinaryContext>
                  </animated.div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Album;
