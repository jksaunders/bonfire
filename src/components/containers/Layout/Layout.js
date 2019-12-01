import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { css } from "../../../utils";

const propTypes = {
  centered: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  columns: PropTypes.string,
  full: PropTypes.bool,
  fullHeight: PropTypes.bool,
  fullWidth: PropTypes.bool,
  gap: PropTypes.string,
  height: PropTypes.string,
  horizontalAlignment: PropTypes.string,
  rows: PropTypes.string,
  padding: PropTypes.string,
  verticalAlignment: PropTypes.string,
  width: PropTypes.string
};

const defaultProps = {
  children: null,
  centered: false,
  className: null,
  columns: null,
  full: false,
  fullHeight: false,
  fullWidth: false,
  gap: null,
  height: "100%",
  horizontalAlignment: null,
  rows: null,
  padding: null,
  verticalAlignment: null,
  width: "100%"
};

const Grid = styled.div`
  display: grid;
  box-sizing: border-box;
  ${css("rows", "grid-template-rows")}
  ${css("columns", "grid-template-columns")}
  ${css("gap", "grid-gap")}
  ${css([
    ["full", "height", "100%"],
    ["fullHeight", "height", "100%"],
    ["height"]
  ])}
  ${css("padding")}
  ${css([
    ["full", "width", "100%"],
    ["fullWidth", "width", "100%"],
    ["width"]
  ])}
  ${css(
    ["centered", "justify-items", "center"],
    ["horizontalAlignment", "justify-items"]
  )}
  ${css(
    ["centered", "align-items", "center"],
    ["verticalAlignment", "align-items"]
  )}
`;

const Layout = ({
  centered,
  children,
  className,
  columns,
  full,
  fullHeight,
  fullWidth,
  gap,
  height,
  horizontalAlignment,
  rows,
  padding,
  verticalAlignment,
  width,
}) => (
  <Grid
    centered={centered}
    columns={columns}
    className={className}
    full={full}
    fullHeight={fullHeight}
    fullWidth={fullWidth}
    gap={gap}
    height={height}
    horizontalAlignment={horizontalAlignment}
    rows={rows}
    padding={padding}
    verticalAlignment={verticalAlignment}
    width={width}
  >
    {children}
  </Grid>
);

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;