import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css, cssBackground, CssRuleType } from '../../../utils/styling';
import { TypographyContext, cssTypography } from '../../Typography';

const propTypes = {
  align: CssRuleType(PropTypes.string),
  background: CssRuleType(PropTypes.string),
  borderRadius: CssRuleType(PropTypes.string),
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: CssRuleType(PropTypes.string),
  columns: CssRuleType(PropTypes.string),
  flow: CssRuleType(PropTypes.string),
  full: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  gap: CssRuleType(PropTypes.string),
  height: CssRuleType(PropTypes.string),
  horizontalAlignment: CssRuleType(PropTypes.string),
  margin: CssRuleType(PropTypes.string),
  overflow: CssRuleType(PropTypes.string),
  overflowX: CssRuleType(PropTypes.string),
  overflowY: CssRuleType(PropTypes.string),
  rows: CssRuleType(PropTypes.string),
  padding: CssRuleType(PropTypes.string),
  useTypography: PropTypes.bool,
  verticalAlignment: CssRuleType(PropTypes.string),
  width: CssRuleType(PropTypes.string)
};

const defaultProps = {
  align: null,
  background: null,
  borderRadius: null,
  children: null,
  centered: false,
  className: null,
  columns: null,
  flow: null,
  full: false,
  fullHeight: false,
  fullWidth: false,
  gap: null,
  height: null,
  horizontalAlignment: null,
  margin: null,
  overflow: null,
  overflowX: null,
  overflowY: null,
  rows: null,
  padding: null,
  useTypography: null,
  verticalAlignment: null,
  width: null
};

const parseAlignTargetValue = alignProp => ({
  target: alignProp.includes('content-') ? 'content' : 'items',
  value: `${alignProp}`.replace('items-', '').replace('content-', '')
});

const alignment = props => {
  if (props.align == null) {
    return '';
  }

  const [first, second] = props.align.split(' ');
  let justifyResult = '';
  let alignResult = '';

  if (first !== '_') {
    const { target: firstTarget, value: firstValue } = parseAlignTargetValue(first);
    justifyResult = `${firstTarget}: ${firstValue}`;
  }

  if (second == null) {
    alignResult = justifyResult;
  } else if (second !== '_') {
    const { target: secondTarget, value: secondValue } = parseAlignTargetValue(second);
    alignResult = `${secondTarget}: ${secondValue}`;
  }

  return `
    ${alignResult && `align-${alignResult};`}
    ${justifyResult && `justify-${justifyResult};`}
  `;
};

const gridDirectionKey = (direction) => props => {
  if (props[direction] == null) {
    return '';
  }
  if (props[direction].includes(' ') || props[direction].includes('repeat')) {
    return `grid-template-${direction}`;
  }
  return `grid-auto-${direction}`;
};

const Grid = styled.div`
  display: grid;
  box-sizing: border-box;
  ${cssBackground}
  ${css('borderRadius', 'border-radius')}

  ${/* grid properties */''}
  ${css('columns', gridDirectionKey('columns'))}
  ${css('rows', gridDirectionKey('rows'))}
  ${css('gap', 'grid-gap')}
  ${css('flow', 'grid-auto-flow')}

  ${/* alignment */''}
  ${css('centered', 'justify-items', 'center')}
  ${css('centered', 'align-items', 'center')}
  ${alignment}

  ${/* sizing */''}
  ${css(
    ['full', 'height', '100%'],
    ['fullHeight', 'height', '100%'],
    ['height']
  )}
  ${css(
    ['full', 'width', '100%'],
    ['fullWidth', 'width', '100%'],
    ['width']
  )}
  ${css('margin')}
  ${css('padding')}


  ${/* overflow */''}
  ${css('overflow')}
  ${css('overflowX', 'overflow-x')}
  ${css('overflowY', 'overflow-y')}
  
  ${/* typography */''}
  ${cssTypography('typographyProps')}
`;

const Layout = ({
  align,
  background,
  borderRadius,
  centered,
  children,
  className,
  columns,
  flow,
  full,
  fullHeight,
  fullWidth,
  gap,
  height,
  horizontalAlignment,
  margin,
  overflow,
  overflowX,
  overflowY,
  rows,
  padding,
  useTypography,
  verticalAlignment,
  width,
}) => {
  const typographyProps = useContext(TypographyContext);

  return (
    <Grid
      align={align}
      background={background}
      borderRadius={borderRadius}
      centered={centered}
      columns={columns}
      className={className}
      flow={flow}
      full={full}
      fullHeight={fullHeight}
      fullWidth={fullWidth}
      gap={gap}
      height={height}
      horizontalAlignment={horizontalAlignment}
      margin={margin}
      overflow={overflow}
      overflowX={overflowX}
      overflowY={overflowY}
      rows={rows}
      padding={padding}
      verticalAlignment={verticalAlignment}
      width={width}
      typographyProps={useTypography ? typographyProps : {}}
    >
      {children}
    </Grid>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
Layout.shape = propTypes;

export default Layout;