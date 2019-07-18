import React from "react";
import { mount } from "enzyme";
import Button from "./Button";

test("Button mounts", () => {
  const wrapper = mount(<Button text="Test text" />);
  expect(wrapper).toExist();
});