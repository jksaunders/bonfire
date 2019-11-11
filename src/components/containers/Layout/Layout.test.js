import React from "react";
import { mount } from "enzyme";
import { expectSnapshot } from "../../../utils/snapshot";
import Layout from "./Layout";

const getLayout = (props = {}) => <Layout {...props} />;

test("Layout mounts", () => {
  const wrapper = mount(getLayout({}));
  expect(wrapper).toExist();
  expectSnapshot(getLayout({}));
});