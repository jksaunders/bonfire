import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css, cssBackground, cssBorder, CssRuleType } from '../../../styling';

export const BoxPropTypes = {
  align: CssRuleType(PropTypes.string),
  background: CssRuleType(PropTypes.string),
  border: CssRuleType(PropTypes.string),
  borderRadius: CssRuleType(PropTypes.string),
  children: PropTypes.node,
  className: CssRuleType(PropTypes.string),
  full: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  height: CssRuleType(PropTypes.string),
  margin: CssRuleType(PropTypes.string),
  maxHeight: CssRuleType(PropTypes.string),
  maxWidth: CssRuleType(PropTypes.string),
  minHeight: CssRuleType(PropTypes.string),
  minWidth: CssRuleType(PropTypes.string),
  overflow: CssRuleType(PropTypes.string),
  overflowX: CssRuleType(PropTypes.string),
  overflowY: CssRuleType(PropTypes.string),
  padding: CssRuleType(PropTypes.string),
  useTypography: PropTypes.bool,
  width: CssRuleType(PropTypes.string),
};

export const BoxDefaultProps = Object.fromEntries(
  Object.entries(BoxPropTypes).map(e => [e[0], null])
);

const cssReset = `
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`;

const StyledBox = styled.div`
  ${/* reset */ ''}
  ${cssReset}
  
  box-sizing: border-box;
  ${cssBackground}
  ${cssBorder}
  ${css('borderRadius', 'border-radius')}

  ${/* sizing */ ''}
  ${css(
    ['full', 'height', '100%'],
    ['fullHeight', 'height', '100%'],
    ['height']
  )}
  ${css(['full', 'width', '100%'], ['fullWidth', 'width', '100%'], ['width'])}
  ${css('maxHeight', 'max-height')}
  ${css('maxWidth', 'max-width')}
  ${css('minHeight', 'min-height')}
  ${css('minWidth', 'min-width')}
  ${css('margin')}
  ${css('padding')}

  ${/* overflow */ ''}
  ${css('overflow')}
  ${css('overflowX', 'overflow-x')}
  ${css('overflowY', 'overflow-y')}
`;

const Box = React.forwardRef(({ children, component, ...rest }, ref) => (
  <StyledBox as={component} ref={ref} {...rest}>
    {children}
  </StyledBox>
));

Box.propTypes = { ...BoxPropTypes, component: PropTypes.string.isRequired };
Box.defaultProps = BoxDefaultProps;

export default Box;
