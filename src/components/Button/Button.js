import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import chroma from 'chroma-js';
import Typography, { MaterialVariants } from '../Typography';
import * as Colors from '../../theming/colors';

const CONSTANTS = {
  VARIANT: {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY',
  },
};

const background = props =>
  props.disabled
    ? chroma(Colors.blue)
        .alpha(0.5)
        .hex()
    : Colors.blue;

const color = props =>
  props.disabled
    ? chroma(Colors.white)
        .alpha(0.65)
        .hex()
    : Colors.white;

const StyledButton = styled.button`
  color: ${color};
  background-color: ${background};
  border-radius: 0.25em;
  border-style: solid;
  border-width: 1px;
  padding: 8px;
  width: ${({ width }) => width};
`;

const propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  typographyProps: PropTypes.shape({
    bold: PropTypes.bool,
  }),
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT)),
  width: PropTypes.string,
};

const defaultProps = {
  disabled: false,
  onClick: () => {},
  typographyProps: {},
  variant: CONSTANTS.VARIANT.PRIMARY,
  width: '100px',
};

const Button = ({ disabled, onClick, text, typographyProps, variant }) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
    text={text}
    variant={variant}
  >
    <Typography {...typographyProps} variant={MaterialVariants.ButtonText}>
      {text}
    </Typography>
  </StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.CONSTANTS = CONSTANTS;

export default Button;
