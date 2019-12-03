import React from "react";
import PropTypes from "prop-types";
import { useDrag } from "react-use-gesture";
import { useSpring, animated, config } from "react-spring";
import Square from "./Square";

const AnimatedSquare = animated(Square);

const propTypes = {
  bounds: PropTypes.shape({
    minX: PropTypes.number.isRequired,
    maxX: PropTypes.number.isRequired,
    minY: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired
  })
};

const defaultProps = {
  bounds: undefined
};

const size = 100;

const DragMe = ({
  bounds
}) => {
  const [{ mousePosition }, set] = useSpring(() => (
    { mousePosition: [0, 0], config: config.gentle }
  ));

  const checkPosition = (xy) => {
    const [x, y] = xy;

    let newX = x - (size / 2);
    let newY = y - (size / 2);

    if (!bounds) {
      return [newX, newY];
    }

    newX = newX < bounds.minX ? bounds.minX : newX;
    newX = newX > bounds.maxX ? bounds.maxX : newX;
    newY = newY < bounds.minY ? bounds.minY : newY;
    newY = newY > bounds.maxY ? bounds.maxY : newY;

    return [newX, newY];
  };

  const bind = useDrag(({ xy }) => set({ mousePosition: checkPosition(xy) }));

  return (
    <AnimatedSquare height={size} width={size} {...bind()} style={{ transform: mousePosition.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} />
  );
};

DragMe.propTypes = propTypes;
DragMe.defaultProps = defaultProps;

export default {
  title: "Animations|Gestures"
};

export const Dragging = () => <DragMe />;

export const DraggingWithinBounds = () => (
  <DragMe bounds={{
    minX: 200, maxX: 500, minY: 100, maxY: 300
  }}
  />
);