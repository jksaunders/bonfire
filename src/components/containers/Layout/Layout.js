import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  children: PropTypes.node,
  columns: PropTypes.string,
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
  columns: null,
  gap: null,
  height: "100%",
  horizontalAlignment: null,
  rows: null,
  padding: null,
  verticalAlignment: null,
  width: "100%"
};

const css = (prop, key) => (props) => {
  if (props[prop] == null) {
    return null;
  }
  const cssKey = key || prop;
  return `${cssKey}: ${props[prop]};`;
};

const Grid = styled.div`
  display: grid;
  ${css("rows", "grid-template-rows")}
  ${css("columns", "grid-template-columns")}
  ${css("gap", "grid-gap")}
  ${css("height")}
  ${css("horizontalAlignment", "justify-items")}
  ${css("padding")}
  ${css("verticalAlignment", "align-items")}
  ${css("width")}
`;

const Layout = ({
  children,
  columns,
  gap,
  height,
  horizontalAlignment,
  rows,
  padding,
  verticalAlignment,
  width,
}) => (
  <Grid
    columns={columns}
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