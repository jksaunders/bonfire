import React from "react";
import {
  expectExists,
  expectSnapshot,
  render
} from "../../utils/snapshot";
import Typography from "./Typography";

test("Typography renders", () => {
  const { component } = render(<Typography>Content</Typography>);
  expectExists(component);
  expectSnapshot(component);
});

describe("Using variant", () => {
  const variant = {
    size: "6rem",
    font: "\"Roboto\",\"Helvetica\",\"Arial\",sans-serif",
    weight: 300,
    lineHeight: 1,
    letterSpacing: "-0.01562em"
  };

  test("no overrides", () => {
    const { component } = render(<Typography variant={variant}>Content</Typography>);
    expectExists(component);
    expectSnapshot(component);
  });

  test("with overrides", () => {
    const { component } = render(
      <Typography h1 lineHeight={4} variant={variant}>Content</Typography>
    );
    expectExists(component);
    expectSnapshot(component);
  });
});