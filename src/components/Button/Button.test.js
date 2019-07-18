import React from "react";
import { mount } from "enzyme";
import { expectSnapshot } from "../../utils/snapshot";
import Button from "./Button";

const getButton = (props = {}) => <Button {...props} />;

test("Button mounts", () => {
  const button = getButton({ text: "Test text" });
  const wrapper = mount(button);
  expect(wrapper).toExist();
  expectSnapshot(button);
});