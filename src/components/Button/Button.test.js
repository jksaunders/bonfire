import React from "react";
import { mount } from "enzyme";
import Button from "./Button";

test("adds 1 + 2 to equal 3", () => {
  const sum = (a, b) => a + b;
  expect(sum(1, 2)).toBe(3);
});

test("Button mounts", () => {
  const wrapper = mount(<Button text="Test text" />);
  expect(wrapper.find("span").length).toBe(1);
});