import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

const propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
};

const defaultProps = {
  color: null,
  size: null,
};

const Progress = ({ color, size }) => (
  <CircularProgress style={{ color, height: size, width: size }} />
);

Progress.propTypes = propTypes;
Progress.defaultProps = defaultProps;

export default Progress;
