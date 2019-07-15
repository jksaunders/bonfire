import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CONSTANTS = {
  HEIGHT: {
    FULL_VIEW: "100vh"
  }
};

const StyledBar = styled.div`
  height: ${({ height }) => height};
  width: 100%;

  ${props => props.backgroundUrl && `background-image: url('${props.backgroundUrl}');`}
  ${props => props.backgroundUrl && "background-size: 100%;"}
`;

const propTypes = {
  backgroundUrl: PropTypes.string,
  children: PropTypes.node,
  height: PropTypes.string,
  parallax: PropTypes.bool,
};

const defaultProps = {
  backgroundUrl: null,
  children: null,
  height: "300px",
  parallax: false
};

const Bar = ({
  children,
  ...rest
}) => (
  <StyledBar {...rest}>
    {children}
  </StyledBar>
);

Bar.propTypes = propTypes;
Bar.defaultProps = defaultProps;
Bar.CONSTANTS = CONSTANTS;

export default Bar;