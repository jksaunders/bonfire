import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

const CONSTANTS = {};

const propTypes = {
  link: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

const defaultProps = {
  link: null,
  onClick: null,
};

const StyledMenuItem = styled.div`
  cursor: pointer;
  margin: 0px 16px;
  text-decoration: none;
`;

const HeaderItem = ({
  link,
  onClick,
  text,
  ...rest
}) => (
  <StyledMenuItem
    onClick={() => {
      if (onClick) {
        onClick();
      }
      if (link && typeof window !== "undefined") {
        window.location.href = link;
      }
    }}
    as={link ? "a" : "div"}
    href={link}
    {...rest}
  >
    <Typography>{text.toUpperCase()}</Typography>
  </StyledMenuItem>
);

HeaderItem.propTypes = propTypes;
HeaderItem.defaultProps = defaultProps;
HeaderItem.CONSTANTS = CONSTANTS;

export default HeaderItem;