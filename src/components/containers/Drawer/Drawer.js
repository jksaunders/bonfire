import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MaterialDrawer from "@material-ui/core/Drawer";

const CONSTANTS = {};

const propTypes = {
  children: PropTypes.node,
  // eslint-disable-next-line react/forbid-prop-types
  drawerStyles: PropTypes.object,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

const defaultProps = {
  children: null,
  drawerStyles: {},
  onClose: null
};

const StyledDrawer = styled(MaterialDrawer)`
  > .MuiDrawer-paperAnchorLeft {
    ${props => [].concat([], ...Object.keys(props.drawerStyles).map(key => `${key}: ${props.drawerStyles[key]};`))}
  }  
`;

const Drawer = ({
  children,
  onClose,
  open,
  ...rest
}) => (
  <StyledDrawer onClose={onClose || null} open={open} {...rest}>
    {children}
  </StyledDrawer>
);

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;
Drawer.CONSTANTS = CONSTANTS;

export default Drawer;