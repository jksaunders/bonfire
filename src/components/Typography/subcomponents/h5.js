import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledH5 = styled.h5`
  color: ${theme(Palette.H5, ThemeConstants.mode.key)};
  font-size: 1.5rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.33;
  letter-spacing: 0em;
  margin: 0;
`;

const H5 = ({ children, ...rest }) => <StyledH5 {...rest}>{children}</StyledH5>;

H5.propTypes = propTypes;
H5.defaultProps = {
  children: null
};

export default H5;