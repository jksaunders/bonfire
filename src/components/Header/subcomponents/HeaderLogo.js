import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Browser } from "../../../utils";

const CONSTANTS = {};

const propTypes = {
  link: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string
};

const defaultProps = {
  link: null,
  onClick: null,
  image: "https://via.placeholder.com/350x150"
};

const StyledHeaderLogo = styled.img`
  cursor: pointer;
  height: auto;
  opacity: 0.7;
  width: auto;
`;

const HeaderItem = ({
  link,
  onClick,
  image,
  ...rest
}) => (
  <StyledHeaderLogo
    onClick={(e) => {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
      Browser.goTo(link);
    }}
    href={link}
    src={image}
    {...rest}
  />
);

HeaderItem.propTypes = propTypes;
HeaderItem.defaultProps = defaultProps;
HeaderItem.CONSTANTS = CONSTANTS;

export default HeaderItem;