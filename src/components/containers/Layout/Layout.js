import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { css } from "../../../utils";

const propTypes = {
  centered: PropTypes.bool,
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
  centered: false,
  columns: null,
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
  ${css("rows", "grid-template-rows")}
  ${css("columns", "grid-template-columns")}
  ${css("gap", "grid-gap")}
  ${css("height")}
  ${css("padding")}
  ${css("width")}

  ${css([
    ["centered", "justify-items", "center"],
    ["horizontalAlignment", "justify-items"]
  ])}
  ${css([
    ["centered", "align-items", "center"],
    ["verticalAlignment", "align-items"]
  ])}
`;

const Layout = ({
  centered,
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
    centered={centered}
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