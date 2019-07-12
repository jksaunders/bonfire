import React, { useRef, useState } from "react";
import {
  useChain, useSpring, animated, config
} from "react-spring";
import { storiesOf } from "@storybook/react";
import Square from "./Square";

const AnimatedSquare = animated(Square);

const ClickMe = () => {
  const [open, setIsOpen] = useState(false);

  const springRef = useRef();
  const { size } = useSpring({
    ref: springRef,
    config: config.stiff,
    from: { size: 0 },
    to: { size: open ? 200 : 0 }
  });

  const springRef2 = useRef();
  const { background } = useSpring({
    ref: springRef2,
    config: config.stiff,
    from: { background: "#48C9B0" },
    to: { background: open ? "lightblue" : "#48C9B0" }
  });

  const chain = [springRef, springRef2];

  useChain(open ? chain : chain.reverse(), [0, open ? 0.7 : 0.3]);

  return (
    <div>
      <AnimatedSquare
        onClick={() => setIsOpen(!open)}
        style={{
          backgroundColor: background.interpolate(c => c),
          height: size.interpolate(n => `${100 + n}px`),
          width: size.interpolate(n => `${100 + n}px`)
        }}
      />
    </div>
  );
};

storiesOf("Animations", module)
  .add("useChain", () => (
    <ClickMe />
  ));