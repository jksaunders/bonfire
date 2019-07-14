import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledSubtitle1 = styled.h6`
  color: ${theme(Palette.SUBTITLE1, ThemeConstants.mode.key)};
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.75;
  letter-spacing: 0.00938em;
  margin: 0;
`;

const Subtitle1 = ({ children, ...rest }) => (
  <StyledSubtitle1 {...rest}>
    {children}
  </StyledSubtitle1>
);

Subtitle1.propTypes = propTypes;
Subtitle1.defaultProps = {
  children: null
};

export default Subtitle1;