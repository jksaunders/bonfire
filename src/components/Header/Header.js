import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { animated, useTransition } from "react-spring";
import {
  HeaderButton,
  HeaderItem,
  HeaderLogo
} from "./subcomponents";

const CONSTANTS = {
  VARIANT: {
    FULL: "FULL",
    SIDE: "SIDE"
  }
};

const padding = "16px";

const StyledBaseHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  padding: ${padding};
  width: 100%;
`;

const FullHeader = styled(StyledBaseHeader)`
  height: ${({ height }) => height};
`;

const FloatingHeader = styled(StyledBaseHeader)`
  box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
  height: 75px;
  left: 0px;
  position: fixed;
`;

const AnimatedFloatingHeader = animated(FloatingHeader);

const getStyledHeader = (variant) => {
  switch (variant) {
    case CONSTANTS.VARIANT.FULL:
      return FullHeader;
    case CONSTANTS.VARIANT.SIDE:
      return null;
    default:
      return null;
  }
};

const propTypes = {
  children: PropTypes.node,
  height: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT)),
  showFloatingHeader: PropTypes.bool
};

const defaultProps = {
  children: null,
  height: "125px",
  variant: CONSTANTS.VARIANT.FULL,
  showFloatingHeader: false
};

const Header = ({
  children,
  variant,
  showFloatingHeader,
  ...rest
}) => {
  const StyledHeader = getStyledHeader(variant);

  const transitions = useTransition(showFloatingHeader, null, {
    from: { top: "-100px" },
    enter: { top: "0px" },
    leave: { top: "-100px" },
  });

  return (
    <React.Fragment>
      <StyledHeader {...rest}>
        {children}
      </StyledHeader>
      {variant === CONSTANTS.VARIANT.FULL
        && transitions.map(({ item, key, props: transitionProps }) => item && (
          <AnimatedFloatingHeader key={key} {...rest} style={{ top: transitionProps.top }}>
            {children}
          </AnimatedFloatingHeader>
        ))
      }
    </React.Fragment>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
Header.CONSTANTS = CONSTANTS;
Header.HeaderButton = HeaderButton;
Header.HeaderItem = HeaderItem;
Header.HeaderLogo = HeaderLogo;

export default Header;