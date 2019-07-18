import React from "react";
import { mount } from "enzyme";
import { expectSnapshot } from "../../../utils/snapshot";
import Bar from "./Bar";

const getBar = (props = {}) => <Bar {...props} />;

test("Bar mounts", () => {
  const wrapper = mount(getBar());
  expect(wrapper).toExist();
  expectSnapshot(getBar());
});