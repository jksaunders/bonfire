import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledSubtitle2 = styled.h6`
  color: ${theme(Palette.SUBTITLE2, ThemeConstants.mode.key)};
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  line-height: 1.57;
  letter-spacing: 0.00714em;
  margin: 0;
`;

const Subtitle2 = ({ children, ...rest }) => (
  <StyledSubtitle2 {...rest}>
    {children}
  </StyledSubtitle2>
);

Subtitle2.propTypes = propTypes;
Subtitle2.defaultProps = {
  children: null
};

export default Subtitle2;