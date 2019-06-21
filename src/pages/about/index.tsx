import React, { useState, Suspense } from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import YoutubeVideo from '../../components/YoutubeVideo';
import { makeStyles } from '@material-ui/styles';
import { createStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import mood from '../../images/mood';
import './about.css';
import { useSpring, animated } from 'react-spring';
// import CircularIndeterminate from '../../components/CircularIndeterminate';

// const YoutubeVideo = React.lazy(() => import('../../components/YoutubeVideo'));

const tutorialSteps = [
  {
    label: 'Photo Gallery',
    imgPath:
      'https://res.cloudinary.com/joshzuckermann-netlify-com/image/upload/v1561080683/carouselImages/IMG_6676_upgzhh.jpg',
  },
  {
    label: 'Photo Gallery',
    imgPath:
      'https://res.cloudinary.com/joshzuckermann-netlify-com/image/upload/v1561080678/carouselImages/image5_tnzhzj.jpg',
  },
  {
    label: 'Photo Gallery',
    imgPath:
      'https://res.cloudinary.com/joshzuckermann-netlify-com/image/upload/v1561080685/carouselImages/IMG_6671_eyj3gx.jpg',
  },
  {
    label: 'Photo Gallery',
    imgPath:
      'https://res.cloudinary.com/joshzuckermann-netlify-com/image/upload/v1561080685/carouselImages/IMG_6677_ttngrr.jpg',
  },
];

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      maxWidth: '300px',
      flexGrow: 1,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: 30,
    },
    img: {
      height: '450px',
      maxWidth: '300px',
      overflow: 'hidden',
      display: 'block',
      width: '100%',
      marginBottom: '0px',
    },
    videoPlaybackWrapper: {
      flexGrow: 1,
      '@media(max-width: 959px)': {
        textAlign: 'center',
      },
    },
    backgroundVideo: {
      width: '528px',
      height: '297px',
      backgroundColor: 'rgb(0,0,0,0.3)',
      padding: '127px',
    },
  })
);

const About = () => {
  const classes = useStyles({});

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  const fade = useSpring({
    from: { opacity: 0 },
    opacity: 1,
    config: { duration: 300 },
  });

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <StaticQuery
      query={graphql`
        query aboutQuery($slug: String) {
          markdownRemark(frontmatter: { slug: { eq: $slug } }) {
            html
            frontmatter {
              title
              date
              slug
            }
          }
        }
      `}
      render={data => (
        <animated.div style={fade}>
          <Grid container spacing={8}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid item lg={10} md={10} sm={12} xs={12}>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.videoPlaybackWrapper}>
                  {/* <Suspense
                    fallback={
                      <div
                        className={`${classes.backgroundVideo} videoPlayback`}
                      >
                        <CircularIndeterminate />
                      </div>
                    }
                  > */}
                  <YoutubeVideo />
                  {/* </Suspense> */}
                </div>
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12}>
              <div className={classes.root}>
                <Paper square elevation={0} className={classes.header}>
                  <Typography>{tutorialSteps[activeStep].label}</Typography>
                </Paper>
                <img
                  id="carouselImage"
                  className={classes.img}
                  src={tutorialSteps[activeStep].imgPath}
                  alt={tutorialSteps[activeStep].label}
                />
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  variant="text"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {/* {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )} */}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {/* {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )} */}
                      Back
                    </Button>
                  }
                />
              </div>
            </Grid>
          </Grid>
        </animated.div>
      )}
    />
  );
};

export default About;
