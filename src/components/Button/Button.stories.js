import React from "react";
import { ThemeProvider } from "styled-components";

import { action } from "@storybook/addon-actions";
import { select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../theming";
import Button from "./Button";

export default {
  title: "Components|Button",
  component: Button,
  decorators: [withKnobs]
};

export const ButtonStory = () => {
  const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
  const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
  const theme = { mode: themeMode, layout: themeLayout };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div>
          {Object.keys(Button.CONSTANTS.VARIANT).map(variantKey => (
            <Button key={variantKey} text={variantKey.toLowerCase()} variant={variantKey} onClick={action("clicked")} />
          ))}
        </div>
        <div>
          {Object.keys(Button.CONSTANTS.VARIANT).map(variantKey => (
            <Button key={variantKey} text={`${variantKey.toLowerCase()} disabled`} variant={variantKey} onClick={action("clicked")} />
          ))}
        </div>
      </div>
    </ThemeProvider>
  );
};

ButtonStory.story = {
  name: "Button"
};