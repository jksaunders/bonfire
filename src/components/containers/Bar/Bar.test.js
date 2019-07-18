import React from "react";
import { mount } from "enzyme";
import Bar from "./Bar";

test("Bar mounts", () => {
  const wrapper = mount(<Bar />);
  expect(wrapper).toExist();
});