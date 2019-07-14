import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  theme, ThemeConstants, Palette
} from "../../../theming";

const propTypes = {
  children: PropTypes.node
};

const StyledBody1 = styled.p`
  color: ${theme(Palette.BODY1, ThemeConstants.mode.key)};
  font-size: 1rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  margin: 0;
`;

const Body1 = ({ children, ...rest }) => (
  <StyledBody1 {...rest}>
    {children}
  </StyledBody1>
);

Body1.propTypes = propTypes;
Body1.defaultProps = {
  children: null
};

export default Body1;