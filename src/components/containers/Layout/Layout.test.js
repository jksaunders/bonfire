import React from "react";
import {
  expectExists,
  expectSnapshot,
  expectStyle,
  render
} from "../../../utils/snapshot";
import Layout from "./Layout";

const getLayout = (props = {}, children) => render(<Layout {...props}>{children}</Layout>);

test("with children", () => {
  const { component } = getLayout({}, <span>Hi!</span>);
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, "display", "grid");
  expectStyle(component, "box-sizing", "border-box");
});

test("with no props", () => {
  const { component } = getLayout({});
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, "display", "grid");
  expectStyle(component, "box-sizing", "border-box");
});

test("with grid properties", () => {
  const { component } = getLayout({ columns: "repeat(3, 3fr)", gap: "10px", rows: "1fr 2fr" });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, "grid-gap", "10px");
  expectStyle(component, "grid-template-columns", "repeat(3,3fr)");
  expectStyle(component, "grid-template-rows", "1fr 2fr");
});

test("with padding", () => {
  const { component } = getLayout({ padding: "10px" });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, "padding", "10px");
});

test("centered", () => {
  const { component } = getLayout({ centered: true });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, "align-items", "center");
  expectStyle(component, "justify-items", "center");
});

test("horizontal/vertical alignment", () => {
  const { component } = getLayout({ horizontalAlignment: "flex-end", verticalAlignment: "center" });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, "align-items", "center");
  expectStyle(component, "justify-items", "flex-end");
});