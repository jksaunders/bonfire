import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledButtonText = styled.span`
  color: ${theme(Palette.BUTTON_TEXT, ThemeConstants.mode.key)};
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.75;
  letter-spacing: 0.02857em;
  text-transform: uppercase;
  margin: 0;
`;

const Button = ({ children, ...rest }) => (
  <StyledButtonText {...rest}>
    {children}
  </StyledButtonText>
);

Button.propTypes = propTypes;
Button.defaultProps = {
  children: null
};

export default Button;