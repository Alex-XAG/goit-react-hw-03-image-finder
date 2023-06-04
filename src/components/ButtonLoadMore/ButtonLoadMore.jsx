import React from 'react';
import PropTypes from 'prop-types';

import { LoadMore } from './ButtonLoadMore.styled';

export const ButtonLoadMore = ({ onClick, status }) => {
  return (
    <LoadMore onClick={onClick} type="button">
      {status === 'pending' ? 'Loading...' : 'Load More'}
    </LoadMore>
  );
};

ButtonLoadMore.propTypes = {
  onClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
};
