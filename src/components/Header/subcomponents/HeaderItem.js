import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography, { MaterialVariants } from '../../Typography';
import { Browser } from '../../../utils';
import * as Colors from '../../../theming/colors';

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
  white-space: nowrap;
  user-select: none;
`;

const HeaderItem = ({ link, onClick, text, ...rest }) => (
  <StyledMenuItem
    onClick={(e) => {
      e.preventDefault();
      if (onClick) {
        onClick();
      }
      Browser.goTo(link);
    }}
    as={link ? 'a' : 'div'}
    href={link}
    {...rest}
  >
    <Typography
      bold
      color={Colors.black}
      variant={MaterialVariants.ButtonText}
      {...rest}
    >
      {text.toUpperCase()}
    </Typography>
  </StyledMenuItem>
);

HeaderItem.propTypes = propTypes;
HeaderItem.defaultProps = defaultProps;
HeaderItem.shape = propTypes;
HeaderItem.CONSTANTS = CONSTANTS;

export default HeaderItem;
