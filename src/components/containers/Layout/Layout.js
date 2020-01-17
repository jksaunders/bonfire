import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box, { BoxPropTypes, BoxDefaultProps } from '../Box';
import { css, CssRuleType } from '../../../styling';
import { TypographyContext, cssTypography } from '../../Typography';

const propTypes = {
  ...BoxPropTypes,
  align: CssRuleType(PropTypes.string),
  centered: PropTypes.bool,
  column: CssRuleType(PropTypes.bool),
  columns: CssRuleType(PropTypes.string),
  flow: CssRuleType(PropTypes.string),
  full: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  gap: CssRuleType(PropTypes.string),
  height: CssRuleType(PropTypes.string),
  horizontalAlignment: CssRuleType(PropTypes.string),
  row: CssRuleType(PropTypes.bool),
  rows: CssRuleType(PropTypes.string),
  useTypography: PropTypes.bool,
  verticalAlignment: CssRuleType(PropTypes.string),
};

const defaultProps = {
  ...BoxDefaultProps,
  align: null,
  centered: false,
  column: null,
  columns: null,
  flow: null,
  full: false,
  fullHeight: false,
  fullWidth: false,
  gap: null,
  height: null,
  horizontalAlignment: null,
  row: null,
  rows: null,
  useTypography: null,
  verticalAlignment: null,
};

const parseAlignTargetValue = alignProp => ({
  target: alignProp.includes('content-') ? 'content' : 'items',
  value: `${alignProp}`.replace('items-', '').replace('content-', ''),
});

const alignment = props => {
  if (props.align == null) {
    return '';
  }

  const [first, second] = props.align.split(' ');
  let justifyResult = '';
  let alignResult = '';

  if (first !== '_') {
    const { target: firstTarget, value: firstValue } = parseAlignTargetValue(
      first
    );
    justifyResult = `${firstTarget}: ${firstValue}`;
  }

  if (second == null) {
    alignResult = justifyResult;
  } else if (second !== '_') {
    const { target: secondTarget, value: secondValue } = parseAlignTargetValue(
      second
    );
    alignResult = `${secondTarget}: ${secondValue}`;
  }

  return `
    ${alignResult && `align-${alignResult};`}
    ${justifyResult && `justify-${justifyResult};`}
  `;
};

const gridDirectionKey = direction => props => {
  if (props[direction] == null) {
    return '';
  }
  if (props[direction].includes(' ') || props[direction].includes('repeat')) {
    return `grid-template-${direction}`;
  }
  return `grid-auto-${direction}`;
};

const StyledBox = styled(Box)`
  display: grid;

  ${/* grid properties */ ''}
  ${css('columns', gridDirectionKey('columns'))}
  ${css('rows', gridDirectionKey('rows'))}
  ${css('gap', 'grid-gap')}
  ${css(
    ['column', 'grid-auto-flow', 'row'],
    ['row', 'grid-auto-flow', 'column'],
    ['flow', 'grid-auto-flow']
  )}

  ${/* alignment */ ''}
  ${css('centered', 'justify-items', 'center')}
  ${css('centered', 'align-items', 'center')}
  ${alignment}
  
  ${/* typography */ ''}
  ${cssTypography('typographyProps')}
`;

const Layout = React.forwardRef(({ children, useTypography, ...rest }, ref) => {
  const typographyProps = useContext(TypographyContext);

  return (
    <StyledBox
      component="div"
      typographyProps={useTypography ? typographyProps : {}}
      {...rest}
      ref={ref}
    >
      {children}
    </StyledBox>
  );
});

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
Layout.shape = propTypes;

export default Layout;
