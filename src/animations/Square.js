import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

const Square = ({
  height,
  width
}) => (
  <div style={{
    backgroundColor: "#48C9B0", color: "white", height: `${height}px`, width: `${width}px`
  }}
  />
);

Square.propTypes = propTypes;

export default Square;