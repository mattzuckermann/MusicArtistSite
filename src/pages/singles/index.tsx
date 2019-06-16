import React from 'react';
import { StaticQuery, graphql, Link } from 'gatsby';
import Layout from '../../components/Layouts/layout';
import {
  Image,
  Video,
  CloudinaryContext,
  Transformation,
} from 'cloudinary-react';
import SEO from '../../components/SEO';
import Grid from '@material-ui/core/Grid';

const Audio = ['Reiki', 'Crush', 'Two Weeks'];

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
                        {track}
                      </h1>
                      <CloudinaryContext cloudName="joshzuckermann-netlify-com">
                        <Image publicId={`singlesImages/${track}`} format="jpg">
                          <Transformation
                            crop="fill"
                            gravity="faces"
                            width="300"
                          />
                        </Image>
                        <Video
                          publicId={`singles/${track}`}
                          height="30"
                          width="270"
                          format="mp3"
                          controls
                        />
                      </CloudinaryContext>
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
