import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledBody2 = styled.p`
  color: ${theme(Palette.BODY2, ThemeConstants.mode.key)};
  font-size: 0.875rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.43;
  letter-spacing: 0.01071em;
  margin: 0;
`;

const Body2 = ({ children, ...rest }) => (
  <StyledBody2 {...rest}>
    {children}
  </StyledBody2>
);

Body2.propTypes = propTypes;
Body2.defaultProps = {
  children: null
};

export default Body2;