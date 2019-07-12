import React from "react";
import PropTypes from "prop-types";
import { useGesture } from "react-use-gesture";
import { useSpring, animated, config } from "react-spring";
import { storiesOf } from "@storybook/react";
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

const DragMe = ({
  bounds
}) => {
  const [{ mousePosition }, set] = useSpring(() => (
    { mousePosition: [0, 0], config: config.gentle }
  ));

  const checkPosition = (local) => {
    if (!bounds) {
      return local;
    }

    const [x, y] = local;
    let newX = x;
    let newY = y;

    newX = newX < bounds.minX ? bounds.minX : newX;
    newX = newX > bounds.maxX ? bounds.maxX : newX;
    newY = newY < bounds.minY ? bounds.minY : newY;
    newY = newY > bounds.maxY ? bounds.maxY : newY;

    return [newX, newY];
  };
  const bind = useGesture({ onDrag: ({ local }) => set({ mousePosition: checkPosition(local) }) });

  return (
    <AnimatedSquare height={100} width={100} {...bind()} style={{ transform: mousePosition.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`), display: "inline-flex" }} />
  );
};

DragMe.propTypes = propTypes;
DragMe.defaultProps = defaultProps;

storiesOf("Animations", module)
  .add("dragging", () => (
    <DragMe />
  ))
  .add("dragging within bounds", () => (
    <DragMe bounds={{
      minX: 200, maxX: 500, minY: 100, maxY: 300
    }}
    />
  ));