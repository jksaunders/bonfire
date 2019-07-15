import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  HeaderButton,
  HeaderItem,
  HeaderLogo
} from "./subcomponents";

const CONSTANTS = {};

const padding = "16px";

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  height: ${({ height }) => height};
  justify-content: flex-end;
  padding: 0px ${padding};
  
  & > img {
    height: ${({ height }) => height};
    margin-right: auto;
  }
`;

const propTypes = {
  children: PropTypes.node,
  height: PropTypes.string
};

const defaultProps = {
  children: null,
  height: "125px"
};

const Header = ({
  children,
  ...rest
}) => (
  <StyledHeader {...rest}>
    {children}
  </StyledHeader>
);

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
Header.CONSTANTS = CONSTANTS;
Header.HeaderButton = HeaderButton;
Header.HeaderItem = HeaderItem;
Header.HeaderLogo = HeaderLogo;

export default Header;