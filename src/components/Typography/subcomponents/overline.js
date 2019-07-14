import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledOverline = styled.span`
  color: ${theme(Palette.OVERLINE, ThemeConstants.mode.key)};
  font-size: 0.75rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 2.66;
  letter-spacing: 0.08333em;
  text-transform: uppercase;
  margin: 0;
`;

const Overline = ({ children, ...rest }) => (
  <StyledOverline {...rest}>
    {children}
  </StyledOverline>
);

Overline.propTypes = propTypes;
Overline.defaultProps = {
  children: null
};

export default Overline;