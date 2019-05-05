import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import Layout from './layout';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import mood from '../../images/mood';
import './postLayout.css';

const tutorialSteps = [
  {
    label: 'Photo Gallery',
    imgPath: mood.orangeBack1,
  },
  {
    label: 'Photo Gallery',
    imgPath: mood.noddingAside,
  },
  {
    label: 'Photo Gallery',
    imgPath: mood.pose2,
  },
  {
    label: 'Photo Gallery',
    imgPath: mood.orangeBack2,
  },
];

const useStyles = makeStyles(() => ({
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
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const TextMobileStepper = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  return (
    <StaticQuery
      query={graphql`
        query PostQuery($slug: String) {
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
        <Layout>
          <Grid container spacing={24}>
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid item lg={10} md={10} sm={12} xs={12}>
                <h1>{data.markdownRemark.frontmatter.title}</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className={classes.videoPlaybackWrapper}>
                  <iframe
                    className="videoPlayback"
                    width="528"
                    height="297"
                    src="https://www.youtube.com/embed/nIds3reW_dY"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  />
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
        </Layout>
      )}
    />
  );
};

export default TextMobileStepper;
