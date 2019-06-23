import ReactDOM from 'react-dom';

// eslint-disable-next-line
export const replaceHydrateFunction = () => (element, container, callback) => {
  ReactDOM.render(element, container, callback);
};
