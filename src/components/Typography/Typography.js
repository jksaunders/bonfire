import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  themeVariant, ThemeConstants, Palette
} from "../../theming";

const CONSTANTS = {
  VARIANT: {
    H1: "H1",
    H2: "H2",
    H3: "H3",
    H4: "H4",
    H5: "H5",
    H6: "H6",
    SUBTITLE1: "SUBTITLE1",
    SUBTITLE2: "SUBTITLE2",
    BODY1: "BODY1",
    BODY2: "BODY2",
    CAPTION: "CAPTION",
    BUTTON_TEXT: "BUTTON_TEXT",
    OVERLINE: "OVERLINE"
  }
};

const propTypes = {
  bold: PropTypes.bool,
  children: PropTypes.node,
  spaceAfter: PropTypes.bool,
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT)).isRequired
};

const defaultProps = {
  bold: false,
  children: null,
  spaceAfter: null
};

const THEME_VARIANTS = {
  [CONSTANTS.VARIANT.H1]: {
    as: "h1",
    color: Palette.H1,
    fontSize: "6rem",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.01562em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.H2]: {
    as: "h2",
    color: Palette.H2,
    fontSize: "3.75rem",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.00833em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.H3]: {
    as: "h3",
    color: Palette.H3,
    fontSize: "3rem",
    fontWeight: 400,
    lineHeight: 1.04,
    letterSpacing: "0em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.H4]: {
    as: "h4",
    color: Palette.H4,
    fontSize: "2.125rem",
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: "0.00735em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.H5]: {
    as: "h5",
    color: Palette.H5,
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: "0em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.H6]: {
    as: "h6",
    color: Palette.H6,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.SUBTITLE1]: {
    as: "h6",
    color: Palette.SUBTITLE1,
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: "0.00938em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.SUBTITLE2]: {
    as: "h6",
    color: Palette.SUBTITLE2,
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: "0.00714em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.BODY1]: {
    as: "p",
    color: Palette.BODY1,
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em",
    spaceAfter: true
  },
  [CONSTANTS.VARIANT.BODY2]: {
    as: "p",
    color: Palette.BODY2,
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    spaceAfter: true
  },
  [CONSTANTS.VARIANT.CAPTION]: {
    as: "span",
    color: Palette.CAPTION,
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em",
    spaceAfter: false
  },
  [CONSTANTS.VARIANT.BUTTON_TEXT]: {
    as: "span",
    color: Palette.BUTTON_TEXT,
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    spaceAfter: false,
    textTransform: "uppercase"
  },
  [CONSTANTS.VARIANT.OVERLINE]: {
    as: "span",
    color: Palette.OVERLINE,
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    spaceAfter: false,
    textTransform: "uppercase"
  }
};

const checkSpaceAfter = ({ spaceAfter, variant }) => {
  if (spaceAfter != null) {
    return spaceAfter;
  }
  return THEME_VARIANTS[variant].spaceAfter;
};

const getFontWeight = ({ bold, variant }) => {
  if (bold) {
    return "bold";
  }

  return THEME_VARIANTS[variant].fontWeight;
};

const StyledTypography = styled.p`
  color: ${themeVariant("variant", "color", THEME_VARIANTS, ThemeConstants.mode.key)};
  font-size: ${(props => THEME_VARIANTS[props.variant].fontSize)};
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: ${getFontWeight};
  line-height: ${(props => THEME_VARIANTS[props.variant].lineHeight)};;
  letter-spacing: ${(props => THEME_VARIANTS[props.variant].letterSpacing)};;
  ${props => THEME_VARIANTS[props.variant].textTransform && `text-transform: ${THEME_VARIANTS[props.variant].textTransform}`}
  margin: 0;
  ${props => checkSpaceAfter(props) && "margin-block-start: 1em;"}
  ${props => checkSpaceAfter(props) && "margin-block-end: 1em;"}
  ${props => checkSpaceAfter(props) && "margin-inline-start: 0px;"}
  ${props => checkSpaceAfter(props) && "margin-inline-end: 0px;"}
  -webkit-font-smoothing: antialiased;
`;

const Typography = ({
  bold,
  children,
  spaceAfter,
  variant,
  ...rest
}) => (
  <StyledTypography
    as={THEME_VARIANTS[variant].as}
    bold={bold}
    spaceAfter={spaceAfter}
    variant={variant}
    {...rest}
  >
    {children}
  </StyledTypography>
);

const getTypographyVariant = (variant) => {
  const TypographyVariant = ({ children, spaceAfter, ...rest }) => (
    <Typography spaceAfter={spaceAfter} variant={variant} {...rest}>
      {children}
    </Typography>
  );
  const { variant: pV, ...variantPropTypes } = propTypes;
  const { variant: dV, ...variantDefaultProps } = defaultProps;
  TypographyVariant.propTypes = variantPropTypes;
  TypographyVariant.defaultProps = variantDefaultProps;
  return TypographyVariant;
};

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;
Typography.CONSTANTS = CONSTANTS;
Typography.H1 = getTypographyVariant(Typography.CONSTANTS.VARIANT.H1);
Typography.H2 = getTypographyVariant(Typography.CONSTANTS.VARIANT.H2);
Typography.H3 = getTypographyVariant(Typography.CONSTANTS.VARIANT.H3);
Typography.H4 = getTypographyVariant(Typography.CONSTANTS.VARIANT.H4);
Typography.H5 = getTypographyVariant(Typography.CONSTANTS.VARIANT.H5);
Typography.H6 = getTypographyVariant(Typography.CONSTANTS.VARIANT.H6);
Typography.Subtitle1 = getTypographyVariant(Typography.CONSTANTS.VARIANT.SUBTITLE1);
Typography.Subtitle2 = getTypographyVariant(Typography.CONSTANTS.VARIANT.SUBTITLE2);
Typography.Body1 = getTypographyVariant(Typography.CONSTANTS.VARIANT.BODY1);
Typography.Body2 = getTypographyVariant(Typography.CONSTANTS.VARIANT.BODY2);
Typography.Caption = getTypographyVariant(Typography.CONSTANTS.VARIANT.CAPTION);
Typography.ButtonText = getTypographyVariant(Typography.CONSTANTS.VARIANT.BUTTON_TEXT);
Typography.Overline = getTypographyVariant(Typography.CONSTANTS.VARIANT.OVERLINE);

export default Typography;