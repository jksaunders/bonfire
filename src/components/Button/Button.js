import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, Palette } from "../../theming";

const StyledButton = styled.button`
  background-color: ${theme(Palette.PRIMARY_BUTTON, "mode")}
`;

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {
  children: null
};

const Button = ({ children }) => (
  <StyledButton>{children}</StyledButton>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;