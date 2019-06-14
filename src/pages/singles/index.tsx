import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../../components/Layouts/layout';
import SEO from '../../components/SEO';
import ReactAudioPlayer from 'react-audio-player';
import Audio from '../../audio';
import Grid from '@material-ui/core/Grid';

const Album = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { regex: "/image5/" }) {
          childImageSharp {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <SEO
          description="visibility improvement"
          title="Album"
          keywords={[`music`, `album`, `react`]}
        />
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="row">
            <div>
              <Grid container spacing={24}>
                {Audio.map((track, currentIndex) => (
                  <Grid key={currentIndex} item lg={4} md={4} sm={12} xs={12}>
                    <div
                      style={{
                        borderRadius: 10,
                        background: '#fecbd0',
                        marginBottom: '40px',
                      }}
                    >
                      <h1
                        style={{
                          padding: '25px 0px',
                          fontFamily: 'futura',
                          borderRadius: 5,
                          backgroundColor: '#fb2f47',
                        }}
                      >
                        {track.name}
                      </h1>
                      <div>
                        <img style={{ width: '300px' }} src={track.image} />
                      </div>
                      <ReactAudioPlayer
                        id={`${currentIndex}`}
                        style={{ width: '270px' }}
                        src={track.src}
                        // onPlay={async () => {
                        //   const indexArr = [];
                        //   await Audio.forEach((track, index) => {
                        //     indexArr.push(index);
                        //   });
                        //   await indexArr.filter(function(number) {
                        //     return number !== currentIndex;
                        //   });
                        // }}
                        controls
                      />
                      <br />
                      <br />
                      <br />
                    </div>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </div>
        <br />
      </>
    )}
  />
);

export default Album;
