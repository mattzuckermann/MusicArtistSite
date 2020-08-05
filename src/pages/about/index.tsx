import React, { useState, useRef, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Grid from '@material-ui/core/Grid';
import YouTubeVideo from '../../components/YouTubeVideo';
import { makeStyles } from '@material-ui/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import SEO from '../../components/SEO';
import './about.css';
import { useSpring, animated } from 'react-spring';

const useStyles = makeStyles({
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
    },
  },
  backgroundVideo: {
    width: '528px',
    height: '297px',
    backgroundColor: 'rgb(0,0,0,0.3)',
    padding: '127px',
  },
});

const About = () => {
  const classes = useStyles();
  const iFrame = useRef(null);
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

  useEffect(() => {
    //   iFrame.current.offsetTop(700);
    // const node = iFrame.current;
    const node2 = document.getElementById('iFrame');
    node2.scrollTo(100, 100);
    // node.scrollTo({
    //   top: 100,
    //   left: 100,
    // });
  }, []);

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = allContentfulPhotoAlbum.edges[0].node.carouselImage.length;

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
        keywords={[`music`, `album`, `josh`, `zuckermann`, `rap`, `chicago`]}
      />
      <Grid container spacing={2}>
        <Grid
          style={{ paddingBottom: '0px' }}
          item
          lg={8}
          md={8}
          sm={12}
          xs={12}
        >
          <Grid item lg={10} md={10} sm={12} xs={12}>
            <h1 style={{ fontSize: '65px' }}>
              {markdownRemark.frontmatter.title}
            </h1>
            <hr style={{ height: '5px', backgroundColor: 'black' }} />
            <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.videoPlaybackWrapper}>
              <YouTubeVideo videoLink="https://www.youtube.com/embed/7mK53nDB-Cw?rel=0" />
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className={classes.videoPlaybackWrapper}>
              <YouTubeVideo videoLink="https://www.youtube.com/embed/nIds3reW_dY?controls=0" />
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div
              style={{ marginBottom: '-32px' }}
              className={classes.videoPlaybackWrapper}
            >
              <YouTubeVideo videoLink="https://www.youtube.com/embed/FPlv7ss4taE?controls=0" />
            </div>
          </Grid>
        </Grid>
        <Grid item lg={4} md={4} sm={12} xs={12}>
          <div>
            <iframe
              id="iFrame"
              ref={iFrame}
              // scrolling="no"
              src="https://johnnycilantro6tet.bandcamp.com/"
              style={{
                width: '405px',
                height: '770px',
                // paddingLeft: "-185px"
              }}
            ></iframe>
          </div>
          <div className={classes.root} style={{ position: 'relative' }}>
            <Paper square elevation={0} className={classes.header}>
              <Typography>
                {allContentfulPhotoAlbum.edges[0].node.name}
              </Typography>
            </Paper>
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
        </Grid>
      </Grid>
      <br />
      <br />
    </animated.div>
  );
};

export default About;
