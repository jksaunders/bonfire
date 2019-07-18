import React from "react";
import { mount } from "enzyme";
import Typography from "./Typography";

test("Typography mounts", () => {
  const wrapper = mount(<Typography.H1>Content</Typography.H1>);
  expect(wrapper).toExist();
});