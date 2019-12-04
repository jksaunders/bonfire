import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { css, cssBackground } from "../../../utils/styling";
import { TypographyContext, cssTypography } from "../../Typography";

const propTypes = {
  background: PropTypes.string,
  borderRadius: PropTypes.string,
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.string,
  flow: PropTypes.string,
  full: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  gap: PropTypes.string,
  height: PropTypes.string,
  horizontalAlignment: PropTypes.string,
  margin: PropTypes.string,
  overflow: PropTypes.string,
  overflowX: PropTypes.string,
  overflowY: PropTypes.string,
  rows: PropTypes.string,
  padding: PropTypes.string,
  useTypography: PropTypes.bool,
  verticalAlignment: PropTypes.string,
  width: PropTypes.string
};

const defaultProps = {
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

const gridDirection = (direction) => props => {
  if (props[direction] == null) {
    return "";
  }
  if (props[direction].includes(" ") || props[direction].includes("repeat")) {
    return `grid-template-${direction}: ${props[direction]};`;
  }
  return `grid-auto-${direction}: ${props[direction]};`;
};

const Grid = styled.div`
  display: grid;
  box-sizing: border-box;
  ${cssBackground}
  ${css("borderRadius", "border-radius")}

  ${/* grid properties */""}
  ${gridDirection("columns")}
  ${gridDirection("rows")}
  ${css("gap", "grid-gap")}
  ${css("flow", "grid-auto-flow")}

  ${css(
    ["full", "height", "100%"],
    ["fullHeight", "height", "100%"],
    ["height"]
  )}
  ${css(
    ["full", "width", "100%"],
    ["fullWidth", "width", "100%"],
    ["width"]
  )}
  ${css("margin")}
  ${css("padding")}

  ${css(
    ["centered", "justify-items", "center"],
    ["horizontalAlignment", "justify-items"]
  )}
  ${css(
    ["centered", "align-items", "center"],
    ["verticalAlignment", "align-items"]
  )}
  ${css("overflow")}
  ${css("overflowX", "overflow-x")}
  ${css("overflowY", "overflow-y")}
  
  ${cssTypography("typographyProps")}
`;

const Layout = ({
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

export default Layout;