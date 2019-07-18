import React from "react";
import { mount } from "enzyme";
import Header from "./Header";

test("Header mounts", () => {
  const wrapper = mount(<Header />);
  expect(wrapper).toExist();
});