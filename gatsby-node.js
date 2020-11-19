const path = require('path');

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query albumQuery {
      allContentfulAlbum {
        edges {
          node {
            id
            albumTitle
            coverArt {
              id
              file {
                url
              }
            }
            tracks {
              id
              original_secure_url
              duration
              public_id
            }
          }
        }
      }
      allCloudinaryMedia(
        sort: { order: ASC, fields: created_at }
        filter: { format: { eq: "png" } }
        limit: 27
      ) {
        edges {
          node {
            id
            secure_url
          }
        }
      }
    }
  `);

  const allCloudinaryIcons = data.allCloudinaryMedia.edges;
  const albumTemplate = path.resolve(`src/templates/albumTemplate/index.tsx`);
  data.allContentfulAlbum.edges.forEach(edge => {
    const albumNode = edge.node;
    const slug = albumNode.albumTitle.toLowerCase();
    actions.createPage({
      path: `/albums/${slug}`,
      component: albumTemplate,
      context: { albumNode, allCloudinaryIcons },
    });
  });
};
