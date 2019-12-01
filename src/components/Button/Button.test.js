import React from "react";
import {
  expectExists,
  expectSnapshot,
  render
} from "../../utils/snapshot";
import Button from "./Button";

const getButton = (props = {}) => render(<Button {...props} />);

test("Button renders", () => {
  const { component } = getButton({ text: "Test text" });
  expectExists(component);
  expectSnapshot(component);
});