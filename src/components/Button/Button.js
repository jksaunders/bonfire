import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, themeVariant, ThemeConstants, Palette
} from "../../theming";

const CONSTANTS = {
  VARIANT: {
    PRIMARY: "PRIMARY",
    // STRONG_PRIMARY: "STRONG_PRIMARY",
    SECONDARY: "SECONDARY",
    // SUBTLE: "SUBTLE",
    // ATTENTION: "ATTENTION",
    // DESTRUCTIVE: "DESTRUCTIVE",
    // SUCCESS: "SUCCESS"
  }
};

const THEME_VARIANTS = {
  PRIMARY: {
    color: Palette.PRIMARY_TEXT,
    backgroundColor: Palette.PRIMARY_BUTTON
  },
  SECONDARY: {
    color: Palette.PRIMARY_TEXT,
    backgroundColor: Palette.SECONDARY_BUTTON
  }
};

const StyledButton = styled.button`
  color: ${theme(Palette.PRIMARY_TEXT, ThemeConstants.mode.key)};
  background-color: ${themeVariant("variant", "backgroundColor", THEME_VARIANTS, ThemeConstants.mode.key)};
  margin: ${theme(Palette.MARGINS, ThemeConstants.layout.key)};
  padding: ${theme(Palette.MARGINS, ThemeConstants.layout.key)};
`;

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT))
};

const defaultProps = {
  children: null,
  onClick: () => {},
  variant: CONSTANTS.VARIANT.PRIMARY
};

const Button = ({ variant, children, onClick }) => (
  <StyledButton variant={variant} onClick={onClick}>{children}</StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.CONSTANTS = CONSTANTS;

export default Button;