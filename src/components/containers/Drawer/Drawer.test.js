import React from "react";
import { mount } from "enzyme";
import Drawer from "./Drawer";

test("Drawer mounts", () => {
  const wrapper = mount(<Drawer open={false} />);
  expect(wrapper).toExist();
});