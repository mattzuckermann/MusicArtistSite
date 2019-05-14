import ReactDOM from 'react-dom';
import './src/components/Header/header.css';

// eslint-disable-next-line
export const replaceHydrateFunction = () => (element, container, callback) => {
  ReactDOM.render(element, container, callback);
};
