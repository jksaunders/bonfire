import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  children: PropTypes.node
};

const StyledCaption = styled.span`
  font-size: 0.75rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  margin: 0;
`;

const Caption = ({ children, ...rest }) => (
  <StyledCaption {...rest}>
    {children}
  </StyledCaption>
);

Caption.propTypes = propTypes;
Caption.defaultProps = {
  children: null
};

export default Caption;