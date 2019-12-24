import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import chroma from 'chroma-js';
import Typography, { MaterialVariants } from '../Typography';
import * as Colors from '../../theming/colors';
import { getVariant, withThemes } from '../../theming/ThemeContext';
import { css } from '../../styling';

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
  ${css('borderRadius', 'border-radius')}
  border-style: solid;
  border-width: 1px;
  padding: 8px;
  width: ${({ width }) => width};
`;

const buttonStyleProps = {
  borderRadius: PropTypes.string,
};

const propTypes = {
  ...buttonStyleProps,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  typographyProps: PropTypes.shape({
    bold: PropTypes.bool,
  }),
  variant: PropTypes.oneOfType([
    PropTypes.shape(buttonStyleProps),
    PropTypes.string,
  ]),
  width: PropTypes.string,
};

const defaultProps = {
  /* eslint-disable react/default-props-match-prop-types */
  borderRadius: null,
  /* eslint-enable react/default-props-match-prop-types */
  disabled: false,
  onClick: () => {},
  typographyProps: {},
  variant: null,
  width: '100px',
};

const Button = ({ disabled, onClick, text, typographyProps, ...props }) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
    text={text}
    {...getVariant('button', props, buttonStyleProps)}
  >
    <Typography variant={MaterialVariants.ButtonText} {...typographyProps}>
      {text}
    </Typography>
  </StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const ThemedButton = withThemes(Button);

export default ThemedButton;
