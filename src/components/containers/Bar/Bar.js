import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const CONSTANTS = {
  HEIGHT: {
    FULL_VIEW: '100vh',
  },
};

const StyledBar = styled.div`
  min-height: ${({ height }) => height};

  ${props => props.background && `background: ${props.background}`}
  ${props =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`}
  ${props =>
    props.backgroundUrl && `background-image: url('${props.backgroundUrl}');`}
  ${props => props.backgroundUrl && 'background-size: 100%;'}
`;

const propTypes = {
  background: PropTypes.string,
  backgroundColor: PropTypes.string,
  backgroundUrl: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
  parallax: PropTypes.bool,
};

const defaultProps = {
  background: null,
  backgroundColor: null,
  backgroundUrl: null,
  children: null,
  height: '300px',
  parallax: false,
};

const Bar = ({ children, ...rest }) => (
  <StyledBar {...rest}>{children}</StyledBar>
);

Bar.propTypes = propTypes;
Bar.defaultProps = defaultProps;
Bar.CONSTANTS = CONSTANTS;

export default Bar;
