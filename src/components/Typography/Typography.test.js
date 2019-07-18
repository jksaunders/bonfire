import React from "react";
import { mount } from "enzyme";
import Typography from "./Typography";
import { expectSnapshot } from "../../utils/snapshot";

test("Typography mounts", () => {
  const h1 = <Typography.H1>Content</Typography.H1>;
  const wrapper = mount(h1);
  expect(wrapper).toExist();
  expectSnapshot(h1);
});