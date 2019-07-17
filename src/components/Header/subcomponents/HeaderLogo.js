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
  ${props => (props.onClick || props.link) && "cursor: pointer;"}
  height: 100%;
  margin-right: auto;
  width: auto;
`;

const getOnClick = (link, onClick) => {
  if (!(link || onClick)) {
    return null;
  }

  return (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
    if (link) {
      Browser.goTo(link);
    }
  };
};

const HeaderItem = ({
  link,
  onClick,
  image,
  ...rest
}) => (
  <StyledHeaderLogo
    onClick={getOnClick(link, onClick)}
    href={link}
    src={image}
    {...rest}
  />
);

HeaderItem.propTypes = propTypes;
HeaderItem.defaultProps = defaultProps;
HeaderItem.CONSTANTS = CONSTANTS;

export default HeaderItem;