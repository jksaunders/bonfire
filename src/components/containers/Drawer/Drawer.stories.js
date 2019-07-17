import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../../theming";
import {
  Button
} from "../..";
import Drawer from "./Drawer";

const StoryWrapper = styled.div``;
const StoryDrawer = styled(Drawer)`
  padding: 32px;
`;
const DrawerContent = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
`;

const DrawerStory = () => {
  const [open, setIsOpen] = useState(false);
  return (
    <StoryWrapper>
      <Button onClick={() => setIsOpen(!open)} text="Drawer" />
      <StoryDrawer onClose={() => setIsOpen(!open)} open={open}>
        <DrawerContent>Hi!</DrawerContent>
      </StoryDrawer>
    </StoryWrapper>
  );
};

storiesOf("Drawer", module)
  .addDecorator(withKnobs)
  .add("with text", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };

    return (
      <ThemeProvider theme={theme}>
        <DrawerStory />
      </ThemeProvider>
    );
  });