import React from 'react';
import PropTypes from 'prop-types';
import MaterialDialog from '@material-ui/core/Dialog';

const propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
};

const defaultProps = {
  children: null,
  onClose: null,
};

const Dialog = ({ children, onClose, ...rest }) => (
  <MaterialDialog
    onBackdropClick={onClose == null ? () => {} : () => onClose()}
    {...rest}
  >
    {children}
  </MaterialDialog>
);

Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;
export default Dialog;
