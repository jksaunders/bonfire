import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css } from '../../styling';
import { bonfireThemePropKey, withThemes } from '../../theming/ThemeContext';

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
  `;
};

const typographyPropTypes = {
  align: PropTypes.string,
  bold: PropTypes.bool,
  color: PropTypes.string,
  font: PropTypes.string,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  h5: PropTypes.bool,
  h6: PropTypes.bool,
  italic: PropTypes.bool,
  letterSpacing: PropTypes.string,
  lineHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  paragraph: PropTypes.bool,
  spaceAfter: PropTypes.bool,
  size: PropTypes.string,
  transform: PropTypes.string,
  weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
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
  weight: null,
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

const getBaseElement = (variant, props) => {
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

const getVariant = (variant, props) => {
  const result = {};
  const themeVariant =
    typeof variant === 'string' && props[bonfireThemePropKey] != null
      ? props[bonfireThemePropKey].getCurrentVariant('typography', variant)
      : null;

  Object.keys(typographyPropTypes).forEach(k => {
    if (props[k] != null) {
      result[k] = props[k];
    } else if (themeVariant != null) {
      result[k] = themeVariant[k];
    } else if (
      typeof variant === 'object' &&
      variant != null &&
      variant[k] != null
    ) {
      result[k] = variant[k];
    }
  });

  return result;
};

const Typography = ({ children, className, variant, ...props }) => (
  <StyledTypography
    className={className}
    {...getVariant(variant, props)}
    as={getBaseElement(variant, props)}
  >
    {children}
  </StyledTypography>
);

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;
export default withThemes(Typography);
