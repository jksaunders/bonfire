import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../theming/themeUtils";

const backgroundColor = theme("PRIMARY_BUTTON");

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