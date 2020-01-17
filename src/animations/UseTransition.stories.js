/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';
import Square from './Square';

const AnimatedSquare = animated(Square);

export const TransitionStory = () => {
  const squares = [
    { height: 50, width: 50 },
    { height: 100, width: 100 },
  ];
  const [index, setIndex] = useState(0);
  const squaresToShow = squares.slice(0, index + 1);
  const transitions = useTransition(squaresToShow, null, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
  });

  return (
    <div onClick={() => setIndex((index + 1) % squares.length)}>
      {transitions.map(({ item, key, props }) => (
        <AnimatedSquare key={key} {...item} style={props} />
      ))}
    </div>
  );
};

export default {
  title: 'Demos|Animations|UseTransition',
};
