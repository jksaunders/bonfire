import React from "react";
import {
  expectExists,
  expectSnapshot,
  render
} from "../../utils/snapshot";
import Typography from "./Typography";

test("Typography renders", () => {
  const { component } = render(<Typography.H1>Content</Typography.H1>);
  expectExists(component);
  expectSnapshot(component);
});