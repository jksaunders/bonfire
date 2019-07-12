import PropTypes from "prop-types";
import styled from "styled-components";

const propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
};

const Square = styled.div`
  background-color: #48C9B0;
  color: white;
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
`;

Square.propTypes = propTypes;

export default Square;