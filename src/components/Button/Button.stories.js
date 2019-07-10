import React from "react";
import { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../theming";
import Button from "./Button";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("with text", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };

    return (
      <ThemeProvider theme={theme}>
        <div>
          {Object.keys(Button.CONSTANTS.VARIANT).map(variantKey => (
            <Button key={variantKey} variant={variantKey} onClick={action("clicked")}>
              {variantKey.toLowerCase()}
            </Button>
          ))}
        </div>
      </ThemeProvider>
    );
  })
  .add("with some emoji", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };
    return (
      <ThemeProvider theme={theme}>
        <Button onClick={action("clicked")}>
          <span role="img" aria-label="so cool">
            😀 😎 👍 💯
          </span>
        </Button>
      </ThemeProvider>
    );
  });