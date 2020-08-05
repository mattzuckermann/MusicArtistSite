import React from 'react';
import PropTypes from 'prop-types';
import RegularLayout from './RegularLayout';
import AlternativeLayout from './AlternativeLayout';

const Index = ({ children, location, pageContext }) => {
  if (pageContext.layout === 'special') {
    return <AlternativeLayout>{children}</AlternativeLayout>;
  }
  return <RegularLayout location={location}>{children}</RegularLayout>;
};

export default Index;

Index.propTypes = {
  children: PropTypes.node.isRequired,
};
