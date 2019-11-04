import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { isArray } from "util";

const CONSTANTS = {
  ORIENTATION: {
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical"
  }
};

const JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS = [
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
];

const propTypes = {
  children: PropTypes.node,
  childrenFlex: PropTypes.oneOf([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
    PropTypes.func
  ]),
  flexWrapReverse: PropTypes.bool,
  horizontalAlignment: PropTypes.oneOf(JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS),
  innerContentWidth: PropTypes.string,
  orientation: PropTypes.oneOf(Object.values(CONSTANTS.ORIENTATION)),
  verticalAlignment: PropTypes.oneOf(JUSTIFY_CONTENT_ALIGN_ITEMS_KEYS)
};

const defaultProps = {
  children: null,
  childrenFlex: 1,
  flexWrapReverse: false,
  horizontalAlignment: "normal",
  innerContentWidth: null,
  orientation: CONSTANTS.ORIENTATION.HORIZONTAL,
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

const getFlexDescendentValues = ({ children, childrenFlex }) => {
  if (typeof childrenFlex === "number") {
    return `
      && > * {
        flex: ${childrenFlex};
      }
    
    `;
  }

  let result = "";

  if (typeof childrenFlex === "function") {
    children.forEach((e, index) => {
      result += `
        && > :nth-child(${index + 1}) {
          flex: ${childrenFlex(index)};
        }
      `;
    });
  }

  if (isArray(childrenFlex)) {
    childrenFlex.forEach((e, index) => {
      result += `
        && > :nth-child(${index + 1}) {
          flex: ${e};
        }
      `;
    });
  }

  return result;
};

const Flex = styled.div`
    display: flex;
    flex-wrap: ${props => (props.flexWrapReverse ? "wrap-reverse" : "wrap")};
    height: 100%;
    width: 100%;

    ${getFlexDescendentValues}
    ${getFlexDirection}
    ${getJustifyContentAndAlignItems}
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