import React from "react";
import { mount } from "enzyme";
import { expectSnapshot } from "../../../utils/snapshot";
import Drawer from "./Drawer";

const getDrawer = (props = {}) => <Drawer {...props} />;

test("Drawer mounts", () => {
  const wrapper = mount(getDrawer({ open: false }));
  expect(wrapper).toExist();
  expectSnapshot(getDrawer({ open: false }));
});