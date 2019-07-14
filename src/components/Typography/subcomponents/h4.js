import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledH4 = styled.h4`
  color: ${theme(Palette.H4, ThemeConstants.mode.key)};
  font-size: 2.125rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.17;
  letter-spacing: 0.00735em;
  margin: 0;
`;

const H4 = ({ children, ...rest }) => <StyledH4 {...rest}>{children}</StyledH4>;

H4.propTypes = propTypes;
H4.defaultProps = {
  children: null
};

export default H4;