import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  HeaderButton,
  HeaderItem
} from "./subcomponents";

const CONSTANTS = {};

const StyledHeader = styled.div`
  align-items: center;
  display: flex;
  height: ${({ height }) => height};
  justify-content: flex-end;
  background-color: lightblue;
  padding: 0px 16px;
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

export default Header;