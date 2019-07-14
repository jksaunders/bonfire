import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledH1 = styled.h1`
  color: ${theme(Palette.H1, ThemeConstants.mode.key)};
  font-size: 6rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.01562em;
  margin: 0;
`;

const H1 = ({ children, ...rest }) => <StyledH1 {...rest}>{children}</StyledH1>;

H1.propTypes = propTypes;
H1.defaultProps = {
  children: null
};

export default H1;