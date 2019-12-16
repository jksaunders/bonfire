import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../../Button';

const CONSTANTS = {};

const propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const defaultProps = {};

const StyledHeaderButton = styled(Button)`
  margin: 0px 16px;
`;

const HeaderButton = ({ onClick, text, ...rest }) => (
  <StyledHeaderButton
    onClick={onClick}
    text={text}
    typographyProps={{ bold: true }}
    {...rest}
  />
);

HeaderButton.propTypes = propTypes;
HeaderButton.defaultProps = defaultProps;
HeaderButton.shape = propTypes;
HeaderButton.CONSTANTS = { ...Button.CONSTANTS, ...CONSTANTS };

export default HeaderButton;
