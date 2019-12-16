import PropTypes from 'prop-types';

export const BACKGROUND_SHAPE = PropTypes.oneOfType([
  PropTypes.shape({
    background: PropTypes.string,
  }),
  PropTypes.shape({
    backgroundColor: PropTypes.string,
  }),
]);

export const getBackground = backgroundShape => {
  if (!backgroundShape) {
    return '';
  }
  if (backgroundShape.background) {
    return `background: ${backgroundShape.background}`;
  }
  if (backgroundShape.backgroundColor) {
    return `background-color: ${backgroundShape.backgroundColor}`;
  }
  return '';
};
