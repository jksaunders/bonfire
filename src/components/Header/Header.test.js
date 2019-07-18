import React from "react";
import { mount } from "enzyme";
import { expectSnapshot } from "../../utils/snapshot";
import Header from "./Header";

const getHeader = (props = {}) => <Header {...props} />;

test("Header mounts", () => {
  const wrapper = mount(getHeader());
  expect(wrapper).toExist();
  expectSnapshot(getHeader());
});