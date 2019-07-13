import PropTypes from "prop-types";
import styled from "styled-components";
import chroma from "chroma-js";

const propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

const getBackground = ({ gradientRotation }) => `linear-gradient(${gradientRotation}deg, #48C9B0 0%, ${chroma("#48C9B0").brighten(2).hex()} 100%)`;

const Square = styled.div`
  background: ${getBackground({ gradientRotation: 85 })};
  color: white;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

Square.propTypes = propTypes;
Square.styles = {
  getBackground
};

export default Square;