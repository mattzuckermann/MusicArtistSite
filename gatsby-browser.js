import React from 'react';
import ReactDOM from 'react-dom';
import { SiteProvider } from './src/context/SiteContext';

// eslint-disable-next-line
export const replaceHydrateFunction = () => (element, container, callback) => {
  ReactDOM.render(element, container, callback);
};

// eslint-disable-next-line import/prefer-default-export
export const wrapRootElement = ({ element }) => {
  // eslint-disable-next-line no-unused-expressions
  <SiteProvider>{element}</SiteProvider>;
};
