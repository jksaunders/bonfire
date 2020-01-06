import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css, cssBackground, cssBorder, CssRuleType } from '../../../styling';
import { withThemes } from '../../../theming';

export const BoxPropTypes = {
  align: CssRuleType(PropTypes.string),
  background: CssRuleType(PropTypes.string),
  border: CssRuleType(PropTypes.string),
  borderRadius: CssRuleType(PropTypes.string),
  children: PropTypes.node,
  className: CssRuleType(PropTypes.string),
  cursor: CssRuleType(PropTypes.string),
  elevation: CssRuleType(PropTypes.number),
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

const fromEntries = iterable =>
  [...iterable].reduce((obj, [key, val]) => {
    // eslint-disable-next-line no-param-reassign
    obj[key] = val;
    return obj;
  }, {});

export const BoxDefaultProps = fromEntries(
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

const materialPaperElevations = [
  'none',
  '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
  '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 5px 8px 0px rgba(0,0,0,0.14), 0px 1px 14px 0px rgba(0,0,0,0.12)',
  '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
  '0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12)',
  '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  '0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)',
  '0px 6px 6px -3px rgba(0,0,0,0.2), 0px 10px 14px 1px rgba(0,0,0,0.14), 0px 4px 18px 3px rgba(0,0,0,0.12)',
  '0px 6px 7px -4px rgba(0,0,0,0.2), 0px 11px 15px 1px rgba(0,0,0,0.14), 0px 4px 20px 3px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 12px 17px 2px rgba(0,0,0,0.14), 0px 5px 22px 4px rgba(0,0,0,0.12)',
  '0px 7px 8px -4px rgba(0,0,0,0.2), 0px 13px 19px 2px rgba(0,0,0,0.14), 0px 5px 24px 4px rgba(0,0,0,0.12)',
  '0px 7px 9px -4px rgba(0,0,0,0.2), 0px 14px 21px 2px rgba(0,0,0,0.14), 0px 5px 26px 4px rgba(0,0,0,0.12)',
  '0px 8px 9px -5px rgba(0,0,0,0.2), 0px 15px 22px 2px rgba(0,0,0,0.14), 0px 6px 28px 5px rgba(0,0,0,0.12)',
  '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
  '0px 8px 11px -5px rgba(0,0,0,0.2), 0px 17px 26px 2px rgba(0,0,0,0.14), 0px 6px 32px 5px rgba(0,0,0,0.12)',
  '0px 9px 11px -5px rgba(0,0,0,0.2), 0px 18px 28px 2px rgba(0,0,0,0.14), 0px 7px 34px 6px rgba(0,0,0,0.12)',
  '0px 9px 12px -6px rgba(0,0,0,0.2), 0px 19px 29px 2px rgba(0,0,0,0.14), 0px 7px 36px 6px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 20px 31px 3px rgba(0,0,0,0.14), 0px 8px 38px 7px rgba(0,0,0,0.12)',
  '0px 10px 13px -6px rgba(0,0,0,0.2), 0px 21px 33px 3px rgba(0,0,0,0.14), 0px 8px 40px 7px rgba(0,0,0,0.12)',
  '0px 10px 14px -6px rgba(0,0,0,0.2), 0px 22px 35px 3px rgba(0,0,0,0.14), 0px 8px 42px 7px rgba(0,0,0,0.12)',
  '0px 11px 14px -7px rgba(0,0,0,0.2), 0px 23px 36px 3px rgba(0,0,0,0.14), 0px 9px 44px 8px rgba(0,0,0,0.12)',
  '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
];

const StyledBox = styled.div`
  ${/* reset */ ''}
  ${cssReset}
  
  box-sizing: border-box;

  ${/* design */ ''}
  ${cssBackground}
  ${cssBorder}
  ${css('borderRadius', 'border-radius')}
  ${css(
    ['boxShadow', 'box-shadow'],
    [
      'elevation',
      'box-shadow',
      props => materialPaperElevations[props.elevation],
    ]
  )}
  ${css('cursor')}

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

Box.propTypes = { ...BoxPropTypes, component: PropTypes.string };
Box.defaultProps = { ...BoxDefaultProps, component: 'div' };

export default withThemes(Box);
