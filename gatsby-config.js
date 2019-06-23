module.exports = {
  siteMetadata: {
    title: 'Zuckermann',
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
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/src/bios`,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-typescript',
    'gatsby-plugin-layout',
  ],
};
