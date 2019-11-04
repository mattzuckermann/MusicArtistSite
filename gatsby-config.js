require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: 'Zuckermann | Portfolio',
    description:
      'A music platform hosting all audio content created by Josh Zuckermann',
    author: 'Matt Zuckermann',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#386390',
        theme_color: '#386390',
        display: 'minimal-ui',
        icon: 'src/images/favicon/favicon.ico', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: `${process.env.SPACE_ID}`,
        accessToken: `${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/bios`,
      },
    },
    {
      resolve: 'gatsby-source-cloudinary',
      options: {
        cloudName: 'joshzuckermann-netlify-com',
        apiKey: '293734324154777',
        apiSecret: 'UnmLFnzyNKCza5VHp29yg0JtCaw',
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-layout',
  ],
};
