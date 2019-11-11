import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isArray } from "util";

const CONSTANTS = {
  JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS: [
    "center",
    "start",
    "end",
    "flex-start",
    "flex-end",
    "left",
    "right",
    "normal",
    "space-between",
    "space-around",
    "space-evenly",
    "stretch"
  ],
  ORIENTATION: {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
  },
  SPACING: {
    SMALL: "small",
    MEDIUM: "medium",
    LARGE: "large"
  }
};

const SPACING_VALUES = {
  [CONSTANTS.SPACING.SMALL]: "4px",
  [CONSTANTS.SPACING.MEDIUM]: "8px",
  [CONSTANTS.SPACING.LARGE]: "16px",
};

const propTypes = {
  children: PropTypes.node,
  childrenFlex: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.func
  ]),
  childrenMargin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.func
  ]),
  flexWrapReverse: PropTypes.bool,
  fullHeightWidth: PropTypes.bool,
  horizontalAlignment: PropTypes.oneOf(CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS),
  innerContentWidth: PropTypes.string,
  linesAlignment: PropTypes.oneOf(CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS),
  orientation: PropTypes.oneOf(Object.values(CONSTANTS.ORIENTATION)),
  padding: PropTypes.oneOf(Object.values(CONSTANTS.SPACING)),
  verticalAlignment: PropTypes.oneOf(CONSTANTS.JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS)
};

const defaultProps = {
  children: null,
  childrenFlex: 1,
  childrenMargin: null,
  flexWrapReverse: false,
  fullHeightWidth: false,
  horizontalAlignment: "normal",
  innerContentWidth: null,
  linesAlignment: null,
  orientation: CONSTANTS.ORIENTATION.HORIZONTAL,
  padding: null,
  verticalAlignment: "normal"
};

const getFlexDirection = ({ orientation }) => {
  let direction = "";
  switch (orientation) {
    case CONSTANTS.ORIENTATION.HORIZONTAL:
      direction = "row";
      break;
    case CONSTANTS.ORIENTATION.VERTICAL:
      direction = "column";
      break;
    default: return null;
  }
  return `flex-direction: ${direction};`;
};

const getJustifyContentAndAlignItems = ({
  horizontalAlignment,
  orientation,
  verticalAlignment
}) => `
  align-items: ${orientation === CONSTANTS.ORIENTATION.HORIZONTAL ? verticalAlignment : horizontalAlignment};
  justify-content: ${orientation === CONSTANTS.ORIENTATION.HORIZONTAL ? horizontalAlignment : verticalAlignment};
`;

const getDescendentValues = ({ children, childrenFlex, childrenMargin }) => {
  if (children == null || children.length === 0) {
    return "";
  }

  const allChildrenValues = {};
  const childrenValues = [...children.map(() => ({}))];

  if (typeof childrenFlex === "number") {
    allChildrenValues.flex = childrenFlex;
  } else if (typeof childrenFlex === "function") {
    children.forEach((e, index) => {
      childrenValues[index].flex = childrenFlex(index);
    });
  } else if (isArray(childrenFlex)) {
    children.forEach((e, index) => {
      childrenValues[index].flex = childrenFlex[index];
    });
  }

  if (typeof childrenMargin === "string") {
    allChildrenValues.margin = childrenMargin;
  } else if (typeof childrenMargin === "function") {
    children.forEach((e, index) => {
      childrenValues[index].margin = childrenMargin(index);
    });
  } else if (isArray(childrenMargin)) {
    children.forEach((e, index) => {
      childrenValues[index].margin = childrenMargin[index];
    });
  }

  let result = "";
  const getSpacingValueForMargin = margin => (
    Object.values(CONSTANTS.SPACING).indexOf(margin) > -1 ? SPACING_VALUES[margin] : margin
  );

  if (Object.keys(allChildrenValues).length > 0) {
    result += `
      && > * {
        ${allChildrenValues.flex != null ? `flex: ${allChildrenValues.flex}` : ""}
        ${allChildrenValues.margin != null ? `margin: ${getSpacingValueForMargin(allChildrenValues.margin)}` : ""}
      }
    `;
  }

  childrenValues.forEach((values, index) => {
    if (Object.keys(values).length > 0) {
      result += `
        && > :nth-child(${index + 1}) {
          ${values.flex != null ? `flex: ${values.flex}` : ""}
          ${values.margin != null ? `margin: ${getSpacingValueForMargin(values.margin)}` : ""}
        }
      `;
    }
  });

  return result;
};

const getPadding = ({ padding }) => (padding != null ? `padding: ${SPACING_VALUES[padding]};` : "");

const getAlignContent = ({ linesAlignment }) => (linesAlignment != null ? `align-content: ${linesAlignment};` : "");

const Flex = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-wrap: ${props => (props.flexWrapReverse ? "wrap-reverse" : "wrap")};
    height: ${props => (props.fullHeightWidth ? "100%" : "auto")};
    width: ${props => (props.fullHeightWidth ? "100%" : "auto")};

    ${getAlignContent}
    ${getDescendentValues}
    ${getFlexDirection}
    ${getJustifyContentAndAlignItems}
    ${getPadding}
`;

export const InnerContentWidthContext = React.createContext(null);

const Layout = ({
  children,
  childrenFlex,
  innerContentWidth,
  ...rest
}) => (
  <InnerContentWidthContext.Provider value={innerContentWidth}>
    <Flex childrenFlex={childrenFlex} {...rest}>
      {children}
    </Flex>
  </InnerContentWidthContext.Provider>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;
Layout.CONSTANTS = CONSTANTS;

export default Layout;