import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "styled-theming";

const backgroundColor = theme("mode", {
  light: "#fafafa",
  dark: "#222"
});

const StyledButton = styled.button`
  background-color: ${backgroundColor}
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