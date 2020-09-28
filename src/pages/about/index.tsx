import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import YouTubeVideo from '../../components/YouTubeVideo';
import { makeStyles } from '@material-ui/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import SEO from '../../components/SEO';
import classnames from 'classnames';
import navigator from '../../js/navigator';
import './about.css';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles({
  root: {
    maxWidth: '300px',
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
    maxWidth: '400px',
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    marginBottom: '0px',
  },
  videoPlaybackWrapper: {
    flexGrow: 1,
    '@media(max-width: 959px)': {
      textAlign: 'center',
      width: '100%',
    },
  },
  backgroundVideo: {
    width: '528px',
    height: '297px',
    backgroundColor: 'rgb(0,0,0,0.3)',
    padding: '127px',
  },
  bioTitle: {
    fontSize: '50px',
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
      padding: '0px 50px',
    },
    '@media(max-width: 350px)': {
      padding: '0px 40px',
    },
  },
  lineDivide: {
    height: '5px',
    marginLeft: '5px',
    marginRight: '5px',
    backgroundColor: 'black',
    '@media(max-width: 959px)': {
      marginLeft: '30px',
      marginRight: '30px',
    },
  },
  carouselGridWrapper: {
    marginTop: '54px',
    '@media(max-width: 959px)': {
      marginTop: '0px',
    },
  },
  iframeTabletLaptop: {
    marginBottom: '0px',
    width: '410px',
    height: '770px',
    overflow: 'hidden',
  },
  iframePhone: {
    marginBottom: '0px',
    width: '410px',
    height: '1550px',
    overflow: 'hidden',
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
              url
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

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = allContentfulPhotoAlbum.edges[0].node.carouselImage.length;
  const videoArray = [
    'https://www.youtube.com/embed/nIds3reW_dY?rel=0',
    'https://www.youtube.com/embed/bnRVlXlIsJs?rel=0',
    'https://www.youtube.com/embed/7mK53nDB-Cw?rel=0',
  ];
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
      <Grid container spacing={1}>
        <Grid
          style={{ paddingBottom: '0px' }}
          item
          lg={7}
          md={7}
          sm={12}
          xs={12}
        >
          <Grid item lg={10} md={10} sm={12} xs={12}>
            <h1 className={classes.bioTitle}>
              {markdownRemark.frontmatter.title}
            </h1>
            <hr className={classes.lineDivide} />
            <div
              className={classes.bioParagraphs}
              dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
            />
          </Grid>
          {videoArray.map(video => (
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <div className={classes.videoPlaybackWrapper}>
                <YouTubeVideo videoLink={`${video}`} />
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
              id="carouselImage"
              className={classes.img}
              src={
                allContentfulPhotoAlbum.edges[0].node.carouselImage[activeStep]
                  .url
              }
              alt={allContentfulPhotoAlbum.edges[0].node.name}
            />
            <MobileStepper
              variant="dots"
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
              scrolling="no"
              src="/iframes"
              // classnames package checking what device is rendering iFrame and responding
              // accordingly with proper CSS.
              className={classnames('', {
                [classes.iframeTabletLaptop]:
                  // !navigator() || (navigator() && screen.width >= 700),
                  true,
                [classes.iframePhone]: navigator() && screen.width < 700,
              })}
            />
          </div>
        </Grid>
      </Grid>
    </animated.div>
  );
};

export default About;
