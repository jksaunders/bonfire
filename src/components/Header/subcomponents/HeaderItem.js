import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const CONSTANTS = {};

const propTypes = {
  text: PropTypes.string.isRequired,
};

const defaultProps = {};

const StyledMenuItem = styled.div`
  margin: 0px 16px;
`;

const HeaderItem = ({
  text
}) => (
  <StyledMenuItem>
    {text}
  </StyledMenuItem>
);

HeaderItem.propTypes = propTypes;
HeaderItem.defaultProps = defaultProps;
HeaderItem.CONSTANTS = CONSTANTS;

export default HeaderItem;