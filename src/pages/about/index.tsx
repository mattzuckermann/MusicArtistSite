import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SEO from '../../components/SEO';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSpring, animated } from 'react-spring';
import VideoJs from '../../components/VideoJs';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
    '@media(max-width: 959px)': {
      maxWidth: '400px',
    },
    '@media(max-width: 749px)': {
      maxWidth: '375px',
    },
    '@media(max-width: 435px)': {
      maxWidth: '300px',
    },
    flexGrow: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '26.1px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: 30,
  },
  img: {
    height: '450px',
    '@media(max-width: 959px)': {
      height: '600px',
    },
    '@media(max-width: 749px)': {
      height: '562.5px',
    },
    '@media(max-width: 435px)': {
      height: '450px',
    },
    maxWidth: '400px',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    marginBottom: '0px',
  },
  videoPlaybackWrapper: {
    flexGrow: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
    '@media(max-width: 959px)': {
      textAlign: 'center',
      width: '90%',
    },
  },
  backgroundVideo: {
    width: '528px',
    height: '297px',
    backgroundColor: 'rgb(0,0,0,0.3)',
    padding: '127px',
  },
  bioTitle: {
    fontSize: '45px',
    padding: '0px 25px',
    '@media(max-width: 959px)': {
      padding: '0px 45px',
    },
  },
  bioParagraphs: {
    padding: '0px 20px',
    '@media(max-width: 959px)': {
      padding: '0px 60px',
    },
    '@media(max-width: 420px)': {
      padding: '0px 40px',
      fontSize: 17,
    },
    '@media(max-width: 350px)': {
      padding: '0px 30px',
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
  carouselGridWrapper: {
    marginTop: '92px',
    '@media(max-width: 959px)': {
      marginTop: '-10px',
    },
  },
  topIframe: {
    border: 0,
    width: '350px',
    height: '470px',
    marginTop: '15px',
    '@media(max-width: 959px)': {
      marginRight: '40px',
    },
    '@media(max-width: 754px)': {
      width: '375px',
      marginRight: '0px',
      height: '490px',
    },
    '@media(max-width: 435px)': {
      width: '350px',
      height: '470px',
    },
  },
  bottomIframe: {
    border: 0,
    width: '350px',
    height: '470px',
    marginTop: '5.5px',
    '@media(max-width: 754px)': {
      width: '375px',
      height: '490px',
    },
    '@media(max-width: 435px)': {
      width: '350px',
      height: '470px',
    },
  },
});

const About = () => {
  const classes = useStyles();
  const { allContentfulPhotoAlbum, markdownRemark } = useStaticQuery(graphql`
    query bioQuery($slug: String) {
      allContentfulPhotoAlbum {
        edges {
          node {
            name
            carouselImage {
              secure_url
            }
          }
        }
      }
      markdownRemark(frontmatter: { slug: { eq: $slug } }) {
        html
        frontmatter {
          title
          date
          slug
        }
      }
    }
  `);

  const muxVideoArray = [
    {
      url:
        'https://stream.mux.com/Us00bwq8fn3m3jTDzC02gfolAM3XXOSdEK4X3wcHd001pc.m3u8',
      thumbnail:
        'https://res.cloudinary.com/dmgmf4lbz/image/upload/v1602074131/Video%20Files/Thumbnail%20Photos/Screen_Shot_2020-10-07_at_5.33.46_AM_lbp7gq.png',
      credits: [
        {
          name: 'Luis Lopez',
          portfolio: 'https://www.instagram.com/luisisnotthatstupid/?igshid=ujfxxuoqv5c',
          youtube:
            'https://www.youtube.com/channel/UCVmf-xFdzgARk144QxP-lRg/videos',
        },
      ],
    },
    {
      url:
        'https://stream.mux.com/70201ZYW49sF01AH8qVidzxLvWuaeik4tGYf9F9E1kUmWM.m3u8',
      thumbnail:
        'https://res.cloudinary.com/dmgmf4lbz/image/upload/v1602073305/Video%20Files/Thumbnail%20Photos/Screen_Shot_2020-10-07_at_5.19.40_AM_uviw96.png',
      credits: [
        {
          name: 'Veronica Mullen',
          portfolio: 'https://vmullenmedia.com',
          youtube: 'https://www.youtube.com/user/Veronnnniica',
        },
      ],
    },
    {
      url:
        'https://stream.mux.com/q7qTYyNp23hSN01Z01EdnDyzsGrENLxpEKzJo502cnJHsE.m3u8',
      thumbnail:
        'https://res.cloudinary.com/dmgmf4lbz/image/upload/v1602073601/Video%20Files/Thumbnail%20Photos/Screen_Shot_2020-10-07_at_5.25.54_AM_fqqtxt.png',
      credits: [],
    },
  ];

  const [videoIndex, setVideoIndex] = useState(muxVideoArray.length);
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = allContentfulPhotoAlbum.edges[0].node.carouselImage.length;

  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 700 },
  });

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <animated.div style={fade}>
      <SEO
        title="About"
        keywords={[
          `music`,
          `album`,
          `josh`,
          `zuckermann`,
          `rap`,
          'pop',
          `chicago`,
        ]}
      />
      <Grid container spacing={3}>
        <Grid
          style={{ paddingBottom: '0px' }}
          item
          lg={7}
          md={7}
          sm={12}
          xs={12}
        >
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <h1 className={classes.bioTitle}>
              {markdownRemark.frontmatter.title}
            </h1>
            <hr className={classes.lineDivide} />
            <div
              className={classes.bioParagraphs}
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            />
          </Grid>
          {muxVideoArray.map((video, index) => (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className={classes.videoPlaybackWrapper}>
                <VideoJs
                  videoSrc={{
                    src: video.url,
                    type: 'application/x-mpegURL',
                  }}
                  muxVideoArray={muxVideoArray}
                  index={index}
                  videoIndex={videoIndex}
                  setVideoIndex={setVideoIndex}
                  videoPoster={video.thumbnail}
                  // videoCredits={video.credits}
                />
                <div>
                  {video.credits.length != 0 && (
                    <div
                      style={{
                        marginTop: '-40px',
                        marginBottom: '14.5px',
                        textAlign: 'left',
                        fontSize: '13px',
                      }}
                    >
                      credits:{' '}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={video.credits[0].portfolio}
                        title="Portfolio"
                      >
                        {video.credits[0].name}
                      </a>{' '}
                      <a
                        rel="noopener noreferrer"
                        target="_blank"
                        href={video.credits[0].youtube}
                        title="YouTube Channel"
                        >
                        <FontAwesomeIcon
                          style={{
                            fontSize: '18px',
                            color: '#f70103',
                            padding: '2px 0px 0px 0px',
                          }}
                          icon={faYoutube}
                        />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          ))}
        </Grid>
        <Grid
          className={classes.carouselGridWrapper}
          item
          lg={5}
          md={5}
          sm={12}
          xs={12}
        >
          <div className={classes.root} style={{ position: 'relative' }}>
            <img
              className={classes.img}
              src={
                allContentfulPhotoAlbum.edges[0].node.carouselImage[activeStep]
                  .secure_url
              }
              alt={allContentfulPhotoAlbum.edges[0].node.name}
            />
            <MobileStepper
              variant="progress"
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  Next
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  Back
                </Button>
              }
            />
          </div>
          <div
            id="iframe-wrapper"
            style={{
              padding: '0px',
              textAlign: 'center',
            }}
          >
            <iframe
              className={classes.topIframe}
              src="https://bandcamp.com/EmbeddedPlayer/album=3135504522/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://kassiusband.bandcamp.com/album/ep">
                EP by Kassius
              </a>
            </iframe>
            <iframe
              className={classes.bottomIframe}
              src="https://bandcamp.com/EmbeddedPlayer/album=2293224677/size=large/bgcol=333333/linkcol=0f91ff/tracklist=false/transparent=true/"
              seamless
            >
              <a href="https://johnnycilantro6tet.bandcamp.com/album/kitchen-cooked">
                Kitchen Cooked by Johnny Cilantro and the Well Seasoned Sextet
              </a>
            </iframe>
          </div>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default About;
