exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;

  if (page.path.match(/iframes/)) {
    page.context.layout = 'special';
    createPage(page);
  }
};