import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css, CssRuleType } from '../../styling';
import { getVariant, withThemes } from '../../theming/ThemeContext';

export const TypographyContext = React.createContext({});

export const cssTypography = typographyPropKey => props => {
  const propsToCheck = typographyPropKey ? props[typographyPropKey] : props;
  return `
    -webkit-font-smoothing: antialiased;
    ${css('align', 'text-align')(propsToCheck)}
    ${css(
      ['bold', 'font-weight', 'bold'],
      ['weight', 'font-weight']
    )(propsToCheck)}
    ${css('color')(propsToCheck)}
    ${css('font', 'font-family')(propsToCheck)}
    ${css('italic', 'font-style', 'italic')(propsToCheck)}
    ${css('letterSpacing', 'letter-spacing')(propsToCheck)}
    ${css('lineHeight', 'line-height')(propsToCheck)}
    ${css('size', 'font-size')(propsToCheck)}
    ${css('transform', 'text-transform')(propsToCheck)}
    ${css('underlined', 'text-decoration', 'underline')(propsToCheck)}
    ${css('whitespace', 'white-space')(propsToCheck)}
  `;
};

export const typographyPropTypes = {
  align: CssRuleType(PropTypes.string),
  bold: CssRuleType(PropTypes.bool),
  color: CssRuleType(PropTypes.string),
  font: CssRuleType(PropTypes.string),
  h1: CssRuleType(PropTypes.bool),
  h2: CssRuleType(PropTypes.bool),
  h3: CssRuleType(PropTypes.bool),
  h4: CssRuleType(PropTypes.bool),
  h5: CssRuleType(PropTypes.bool),
  h6: CssRuleType(PropTypes.bool),
  italic: CssRuleType(PropTypes.bool),
  letterSpacing: CssRuleType(PropTypes.string),
  lineHeight: CssRuleType(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  paragraph: CssRuleType(PropTypes.bool),
  spaceAfter: CssRuleType(PropTypes.bool),
  size: CssRuleType(PropTypes.string),
  transform: CssRuleType(PropTypes.string),
  underlined: CssRuleType(PropTypes.bool),
  weight: CssRuleType(
    PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  ),
  whitespace: CssRuleType(PropTypes.string),
};

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  variant: PropTypes.oneOfType([
    PropTypes.shape(typographyPropTypes),
    PropTypes.string,
  ]),
  ...typographyPropTypes,
};

const defaultProps = {
  /* eslint-disable react/default-props-match-prop-types */
  align: null,
  bold: null,
  color: null,
  font: null,
  h1: null,
  h2: null,
  h3: null,
  h4: null,
  h5: null,
  h6: null,
  italic: null,
  letterSpacing: null,
  lineHeight: null,
  paragraph: null,
  spaceAfter: null,
  size: null,
  transform: null,
  underlined: null,
  weight: null,
  whitespace: null,
  /* eslint-enable react/default-props-match-prop-types */

  children: null,
  className: null,
  variant: null,
};

const StyledTypography = styled.span`
  margin: 0;
  ${css('spaceAfter', 'margin-block-start', '1em')}
  ${css('spaceAfter', 'margin-block-end', '1em')}
  ${css('spaceAfter', 'margin-inline-start', '0px')}
  ${css('spaceAfter', 'margin-inline-end', '0px')}
  ${cssTypography()}
`;

const getBaseElement = props => {
  const { variant } = props;
  let baseElement = 'span';

  if ((variant && variant.h1) || props.h1) {
    baseElement = 'h1';
  } else if ((variant && variant.h2) || props.h2) {
    baseElement = 'h2';
  } else if ((variant && variant.h3) || props.h3) {
    baseElement = 'h3';
  } else if ((variant && variant.h4) || props.h4) {
    baseElement = 'h4';
  } else if ((variant && variant.h5) || props.h5) {
    baseElement = 'h5';
  } else if ((variant && variant.h6) || props.h6) {
    baseElement = 'h6';
  } else if ((variant && variant.paragraph) || props.paragraph) {
    baseElement = 'p';
  }

  return baseElement;
};

const Typography = ({
  children,
  className,
  'data-test': dataTest,
  ...props
}) => (
  <StyledTypography
    className={className}
    data-test={dataTest}
    {...getVariant('typography', props, {}, typographyPropTypes)}
    as={getBaseElement(props)}
  >
    {children}
  </StyledTypography>
);

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;
export default withThemes(Typography);
