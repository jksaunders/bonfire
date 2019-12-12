/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  useSpring, animated, config, interpolate
} from 'react-spring';

const StyledConfettiDot = styled.svg`
  position: absolute;
  will-change: transform;
`;

const AnimatedConfettiDot = animated(StyledConfettiDot);

const alignWithAnchor = (anchorRef) => {
  if (!anchorRef.current) {
    return {};
  }

  const { width } = anchorRef.current.getBoundingClientRect();

  return {
    initialX: width / 2,
    initialY: 0
  };
};

const getRandomListItem = list => list[Math.floor(Math.random() * list.length)];

const flatRandom = (min, max) => (Math.random() * (max - min)) + min;

const bellCurveRandom = (min, max) => {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return bellCurveRandom(); // resample between 0 and 1
  return (num * (max - min)) + min;
};

const Circle = ({
  color,
  initialSize
}) => (
  <circle
    cx={`${initialSize / 2}`}
    cy={`${initialSize / 2}`}
    r={`${(initialSize / 2) * 0.6}`}
    fill={color}
  />
);

const Triangle = ({
  color,
  initialSize
}) => {
  const flipped = Math.round(Math.random()) === 1;
  return (
    <polygon
      points={`${initialSize / 2},0 ${initialSize},${flatRandom(flipped ? (initialSize / 2) : 0, initialSize)} 0,${flatRandom(flipped ? 0 : (initialSize / 2), initialSize)}`}
      fill={color}
    />
  );
};

const Square = ({
  color,
  initialSize
}) => {
  const flipped = Math.round(Math.random()) === 1;
  return (
    <rect
      height={`${flatRandom(0, flipped ? initialSize : initialSize / 2)}`}
      width={`${flatRandom(0, flipped ? initialSize / 2 : initialSize)}`}
      fill={color}
    />
  );
};

const randomShape = (props) => {
  const shapes = ['circle', 'triangle', 'rectangle'];
  const shape = getRandomListItem(shapes);
  switch (shape) {
    case 'circle': return <Circle {...props} />;
    case 'triangle': return <Triangle {...props} />;
    case 'rectangle': return <Square {...props} />;
    default: return null;
  }
};

const ConfettiDot = ({
  anchorRef,
  color,
  initialSize,
  horizontalEnergy,
  rotate,
  upwardsEnergy,
}) => {
  const { initialX, initialY } = alignWithAnchor(anchorRef);

  const {
    horizontal,
    opacity,
    scale,
    upwards,
  } = useSpring({
    config: config.default,
    from: {
      upwards: upwardsEnergy, horizontal: horizontalEnergy, opacity: 80, scale: 1
    },
    to: {
      upwards: 0, horizontal: 0, opacity: 0, scale: 0.6
    }
  });

  let totalUpwards = 0;
  let totalHorizontal = 0;
  const startTime = (new Date()).getTime() / 1000;
  let lastTime = startTime;
  const gravityPerSecond = 30;

  return (
    <AnimatedConfettiDot
      height={`${initialSize}`}
      width={`${initialSize}`}
      style={{
        opacity,
        transform: interpolate([upwards, horizontal, scale], (v, h, s) => {
          const currentTime = (new Date()).getTime() / 1000;
          const duration = currentTime - lastTime;
          const totalDuration = currentTime - startTime;
          const verticalTraveled = v * duration;
          const horizontalTraveled = h * duration;
          totalUpwards += verticalTraveled;
          totalHorizontal += horizontalTraveled;
          lastTime = currentTime;

          const totalGravity = gravityPerSecond * totalDuration;
          const finalX = initialX + totalHorizontal;
          const finalY = initialY - totalUpwards + totalGravity;

          return `translate3d(${finalX}px, ${finalY}px, 0) scale(${s}) rotate(${rotate}deg)`;
        })
      }}
    >
      {randomShape({ color, initialSize })}
    </AnimatedConfettiDot>
  );
};

export default {
  title: 'Demos|Animations|Confetti'
};

const ConfettiCannon = ({
  anchorRef,
  colors,
  directional,
  dotCount,
  size,
  horizontal,
  upwards
}) => {
  const random = directional ? bellCurveRandom : flatRandom;
  return (
    <div>
      {(new Array(dotCount).fill()).map((_, index) => (
        <ConfettiDot
          key={index}
          anchorRef={anchorRef}
          color={getRandomListItem(colors)}
          initialSize={flatRandom(size[0], size[1])}
          horizontalEnergy={random(horizontal[0], horizontal[1])}
          rotate={flatRandom(0, 360)}
          upwardsEnergy={random(upwards[0], upwards[1])}
        />
      ))}
    </div>
  );
};

const ButtonWithConfetti = () => {
  const [done, setDone] = useState(false);
  const anchorRef = useRef();

  return (
    <button ref={anchorRef} onClick={() => setDone(!done)}>
      {done ? 'Done!' : 'Not done'}
      { done && (
      <ConfettiCannon
        anchorRef={anchorRef}
        colors={['red', 'yellow', 'blue', 'green', 'purple']}
        dotCount={100}
        size={[8, 12]}
        horizontal={[-300, 300]}
        upwards={[500, 1000]}
      />
      ) }

    </button>
  );
};

export const ConfettiStory = () => (
  <div style={{ height: '2000px', width: '2000px' }}>
    <p>Welcome to the app!</p>
    <p>Try doing something.</p>
    <p>Maybe clicking the button?</p>
    <p>It might do something.</p>
    <p>This is actually hosted separately at @jksaunders/confetti!</p>
    <ButtonWithConfetti />
    <ButtonWithConfetti />
    <ButtonWithConfetti />
  </div>
);

ConfettiStory.story = {
  name: 'Confetti'
};