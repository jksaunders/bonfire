import React from "react";
import { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../theming";
import Typography from "./Typography";

storiesOf("Typography", module)
  .addDecorator(withKnobs)
  .add("Typography", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };

    return (
      <ThemeProvider theme={theme}>
        <div>
          <div>
            <Typography.H1>h1</Typography.H1>
          </div>
          <div>
            <Typography.H2>h2</Typography.H2>
          </div>
          <div>
            <Typography.H3>h3</Typography.H3>
          </div>
          <div>
            <Typography.H4>h4</Typography.H4>
          </div>
          <div>
            <Typography.H5>h5</Typography.H5>
          </div>
          <div>
            <Typography.H6>h6</Typography.H6>
          </div>
          <div>
            <Typography.Subtitle1>subtitle1</Typography.Subtitle1>
          </div>
          <div>
            <Typography.Subtitle2>subtitle2</Typography.Subtitle2>
          </div>
          <div>
            <Typography.Body1>body1</Typography.Body1>
          </div>
          <div>
            <Typography.Body2>body2</Typography.Body2>
          </div>
          <div>
            <Typography.Caption>caption</Typography.Caption>
          </div>
          <div>
            <Typography.ButtonText>button</Typography.ButtonText>
          </div>
          <div>
            <Typography.Overline>overline</Typography.Overline>
          </div>
        </div>
      </ThemeProvider>
    );
  });