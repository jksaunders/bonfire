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
  children: PropTypes.node,
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT)).isRequired
};

const defaultProps = {
  children: null
};

const THEME_VARIANTS = {
  [CONSTANTS.VARIANT.H1]: {
    as: "h1",
    color: Palette.H1,
    fontSize: "6rem",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.01562em"
  },
  [CONSTANTS.VARIANT.H2]: {
    as: "h2",
    color: Palette.H2,
    fontSize: "3.75rem",
    fontWeight: 300,
    lineHeight: 1,
    letterSpacing: "-0.00833em"
  },
  [CONSTANTS.VARIANT.H3]: {
    as: "h3",
    color: Palette.H3,
    fontSize: "3rem",
    fontWeight: 400,
    lineHeight: 1.04,
    letterSpacing: "0em"
  },
  [CONSTANTS.VARIANT.H4]: {
    as: "h4",
    color: Palette.H4,
    fontSize: "2.125rem",
    fontWeight: 400,
    lineHeight: 1.17,
    letterSpacing: "0.00735em"
  },
  [CONSTANTS.VARIANT.H5]: {
    as: "h5",
    color: Palette.H5,
    fontSize: "1.5rem",
    fontWeight: 400,
    lineHeight: 1.33,
    letterSpacing: "0em"
  },
  [CONSTANTS.VARIANT.H6]: {
    as: "h6",
    color: Palette.H6,
    fontSize: "1.25rem",
    fontWeight: 500,
    lineHeight: 1.6,
    letterSpacing: "0.0075em"
  },
  [CONSTANTS.VARIANT.SUBTITLE1]: {
    as: "h6",
    color: Palette.SUBTITLE1,
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.75,
    letterSpacing: "0.00938em"
  },
  [CONSTANTS.VARIANT.SUBTITLE2]: {
    as: "h6",
    color: Palette.SUBTITLE2,
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.57,
    letterSpacing: "0.00714em"
  },
  [CONSTANTS.VARIANT.BODY1]: {
    as: "p",
    color: Palette.BODY1,
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: "0.00938em"
  },
  [CONSTANTS.VARIANT.BODY2]: {
    as: "p",
    color: Palette.BODY2,
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: 1.43,
    letterSpacing: "0.01071em"
  },
  [CONSTANTS.VARIANT.CAPTION]: {
    as: "span",
    color: Palette.CAPTION,
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 1.66,
    letterSpacing: "0.03333em"
  },
  [CONSTANTS.VARIANT.BUTTON_TEXT]: {
    as: "span",
    color: Palette.BUTTON_TEXT,
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase"
  },
  [CONSTANTS.VARIANT.OVERLINE]: {
    as: "span",
    color: Palette.OVERLINE,
    fontSize: "0.75rem",
    fontWeight: 400,
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase"
  }
};

const StyledTypography = styled.p`
  color: ${themeVariant("variant", "color", THEME_VARIANTS, ThemeConstants.mode.key)};
  font-size: ${(props => THEME_VARIANTS[props.variant].fontSize)};
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: ${(props => THEME_VARIANTS[props.variant].fontWeight)};;
  line-height: ${(props => THEME_VARIANTS[props.variant].lineHeight)};;
  letter-spacing: ${(props => THEME_VARIANTS[props.variant].letterSpacing)};;
  ${props => THEME_VARIANTS[props.variant].textTransform && `text-transform: ${THEME_VARIANTS[props.variant].textTransform}`}
  margin: 0;
`;

const Typography = ({ children, variant, ...rest }) => (
  <StyledTypography as={THEME_VARIANTS[variant].as} variant={variant} {...rest}>
    {children}
  </StyledTypography>
);

const typographyVariant = (variant) => {
  const TypographyVariant = ({ children, ...rest }) => (
    <Typography variant={variant} {...rest}>
      {children}
    </Typography>
  );
  TypographyVariant.propTypes = {
    children: PropTypes.node
  };
  TypographyVariant.defaultProps = {
    children: null
  };
  return TypographyVariant;
};

Typography.propTypes = propTypes;
Typography.defaultProps = defaultProps;
Typography.CONSTANTS = CONSTANTS;
Typography.H1 = typographyVariant(Typography.CONSTANTS.VARIANT.H1);
Typography.H2 = typographyVariant(Typography.CONSTANTS.VARIANT.H2);
Typography.H3 = typographyVariant(Typography.CONSTANTS.VARIANT.H3);
Typography.H4 = typographyVariant(Typography.CONSTANTS.VARIANT.H4);
Typography.H5 = typographyVariant(Typography.CONSTANTS.VARIANT.H5);
Typography.H6 = typographyVariant(Typography.CONSTANTS.VARIANT.H6);
Typography.Subtitle1 = typographyVariant(Typography.CONSTANTS.VARIANT.SUBTITLE1);
Typography.Subtitle2 = typographyVariant(Typography.CONSTANTS.VARIANT.SUBTITLE2);
Typography.Body1 = typographyVariant(Typography.CONSTANTS.VARIANT.BODY1);
Typography.Body2 = typographyVariant(Typography.CONSTANTS.VARIANT.BODY2);
Typography.Caption = typographyVariant(Typography.CONSTANTS.VARIANT.CAPTION);
Typography.ButtonText = typographyVariant(Typography.CONSTANTS.VARIANT.BUTTON_TEXT);
Typography.Overline = typographyVariant(Typography.CONSTANTS.VARIANT.OVERLINE);

export default Typography;