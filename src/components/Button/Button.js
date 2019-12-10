import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import chroma from 'chroma-js';
import Typography, { MaterialVariants } from '../Typography';
import {
  theme, themeVariant, ThemeConstants, Palette
} from '../../theming';

const CONSTANTS = {
  VARIANT: {
    PRIMARY: 'PRIMARY',
    SECONDARY: 'SECONDARY'
  }
};

const THEME_VARIANTS = {
  [CONSTANTS.VARIANT.PRIMARY]: {
    color: Palette.PRIMARY_TEXT,
    backgroundColor: Palette.PRIMARY_BUTTON
  },
  [CONSTANTS.VARIANT.SECONDARY]: {
    color: Palette.SECONDARY_TEXT,
    backgroundColor: Palette.SECONDARY_BUTTON
  }
};

const disabledBackground = props => (props.disabled
  ? chroma(themeVariant('variant', 'backgroundColor', THEME_VARIANTS, ThemeConstants.mode.key)(props)(props)).alpha(0.5).hex()
  : themeVariant('variant', 'backgroundColor', THEME_VARIANTS, ThemeConstants.mode.key)(props));

const disabledColor = props => (props.disabled
  ? chroma(themeVariant('variant', 'color', THEME_VARIANTS, ThemeConstants.mode.key)(props)(props)).alpha(0.65).hex()
  : themeVariant('variant', 'color', THEME_VARIANTS, ThemeConstants.mode.key)(props));

const StyledButton = styled.button`
  color: ${props => disabledColor(props)};
  background-color: ${props => disabledBackground(props)};
  border-radius: 0.25em;
  border-style: solid;
  border-width: ${({ variant }) => (variant === CONSTANTS.VARIANT.PRIMARY ? 0 : 1)}px;
  margin: ${theme(Palette.MARGINS, ThemeConstants.layout.key)};
  padding: ${theme(Palette.MARGINS, ThemeConstants.layout.key)};
  width: ${({ width }) => width}
`;

const propTypes = {
  children: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  typographyProps: PropTypes.shape({
    bold: PropTypes.bool
  }),
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT)),
  width: PropTypes.string
};

const defaultProps = {
  children: null,
  disabled: false,
  onClick: () => {},
  typographyProps: {},
  variant: CONSTANTS.VARIANT.PRIMARY,
  width: '100px'
};

const Button = ({
  children,
  disabled,
  onClick,
  text,
  typographyProps,
  variant,
  ...rest
}) => (
  <StyledButton
    disabled={disabled}
    onClick={onClick}
    text={text}
    variant={variant}
    {...rest}
  >
    <Typography {...typographyProps} variant={MaterialVariants.ButtonText}>{text}</Typography>
  </StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.CONSTANTS = CONSTANTS;

export default Button;