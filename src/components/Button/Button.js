import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, ThemeConstants, Palette } from "../../theming";

const StyledButton = styled.button`
  background-color: ${theme(Palette.PRIMARY_BUTTON, ThemeConstants.mode.key)};
  margin: ${theme(Palette.MARGINS, ThemeConstants.layout.key)};
  padding: ${theme(Palette.MARGINS, ThemeConstants.layout.key)};
`;

const propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func
};

const defaultProps = {
  children: null,
  onClick: () => {}
};

const Button = ({ children, onClick }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;