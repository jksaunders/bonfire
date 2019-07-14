import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Button from "../../Button";

const CONSTANTS = {};

const propTypes = {
  text: PropTypes.string.isRequired,
};

const defaultProps = {};

const StyledHeaderButton = styled(Button)`
  margin: 0px 16px;
`;

const HeaderButton = ({
  text,
  ...rest
}) => (
  <StyledHeaderButton {...rest} text={text} />
);

HeaderButton.propTypes = propTypes;
HeaderButton.defaultProps = defaultProps;
HeaderButton.CONSTANTS = { ...Button.CONSTANTS, ...CONSTANTS };

export default HeaderButton;