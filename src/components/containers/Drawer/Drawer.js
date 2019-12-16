import React from 'react';
import PropTypes from 'prop-types';
import MaterialDrawer from '@material-ui/core/Drawer';

const CONSTANTS = {};

const propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};

const defaultProps = {
  children: null,
  onClose: null,
};

const Drawer = ({ children, onClose, open }) => (
  <MaterialDrawer onClose={onClose} open={open}>
    {children}
  </MaterialDrawer>
);

Drawer.propTypes = propTypes;
Drawer.defaultProps = defaultProps;
Drawer.CONSTANTS = CONSTANTS;

export default Drawer;
