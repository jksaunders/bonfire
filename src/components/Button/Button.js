import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography, { typographyPropTypes } from '../Typography';
import { getVariant, withThemes } from '../../theming/ThemeContext';
import { css, cssBackground } from '../../styling';

const StyledButton = styled.button`
  ${props => cssBackground(props, { alpha: props.disabled ? 0.5 : 1 })}
  ${css('borderRadius', 'border-radius')}
  ${css('borderStyle', 'border-style')}
  ${css('borderWidth', 'border-width')}
  ${css('cursor', 'cursor', props => (props.disabled ? 'auto' : props.cursor))}
  ${css('padding')}
  ${css('width')}
`;

const buttonStyleProps = {
  background: PropTypes.string,
  borderRadius: PropTypes.string,
  borderStyle: PropTypes.string,
  borderWidth: PropTypes.string,
  cursor: PropTypes.string,
  padding: PropTypes.string,
  typography: PropTypes.shape(typographyPropTypes),
};

const propTypes = {
  ...buttonStyleProps,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  variant: PropTypes.oneOfType([
    PropTypes.shape(buttonStyleProps),
    PropTypes.string,
  ]),
  width: PropTypes.string,
};

const defaultProps = {
  /* eslint-disable react/default-props-match-prop-types */
  background: null,
  borderRadius: null,
  borderStyle: null,
  borderWidth: null,
  cursor: 'pointer',
  padding: null,
  typography: null,
  /* eslint-enable react/default-props-match-prop-types */
  disabled: false,
  onClick: () => {},
  variant: null,
  width: '100px',
};

const Button = ({ disabled, onClick, text, ...props }) => {
  const { typography, ...buttonVariant } = getVariant(
    'button',
    props,
    buttonStyleProps
  );
  return (
    <StyledButton
      disabled={disabled}
      onClick={onClick}
      text={text}
      {...buttonVariant}
    >
      <Typography {...typography}>{text}</Typography>
    </StyledButton>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const ThemedButton = withThemes(Button);

export default ThemedButton;
