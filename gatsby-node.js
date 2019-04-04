const path = require('path');

const ALL_POSTS_QUERY = `{
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }`;

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    graphql(ALL_POSTS_QUERY).then(results => {
      results.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
          path: `/bio${node.frontmatter.slug}`,
          component: path.resolve('./src/components/Layouts/postLayout.tsx'),
          context: {
            slug: node.frontmatter.slug,
          },
        });
      });
      resolve();
    });
  });
};
