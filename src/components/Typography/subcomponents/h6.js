import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledH6 = styled.h6`
  color: ${theme(Palette.H6, ThemeConstants.mode.key)};
  font-size: 1.25rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.6;
  letter-spacing: 0.0075em;
  margin: 0;
`;

const H6 = ({ children, ...rest }) => <StyledH6 {...rest}>{children}</StyledH6>;

H6.propTypes = propTypes;
H6.defaultProps = {
  children: null
};

export default H6;