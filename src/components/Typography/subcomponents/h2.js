import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  children: PropTypes.node
};

const StyledH2 = styled.h2`
  font-size: 3.75rem;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.00833em;
  margin: 0;
`;

const H2 = ({ children, ...rest }) => <StyledH2 {...rest}>{children}</StyledH2>;

H2.propTypes = propTypes;
H2.defaultProps = {
  children: null
};

export default H2;