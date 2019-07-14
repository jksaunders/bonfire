import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledH3 = styled.h3`
  color: ${theme(Palette.H3, ThemeConstants.mode.key)};
  font-size: 3rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: 0em;
  margin: 0;
`;

const H3 = ({ children, ...rest }) => <StyledH3 {...rest}>{children}</StyledH3>;

H3.propTypes = propTypes;
H3.defaultProps = {
  children: null
};

export default H3;