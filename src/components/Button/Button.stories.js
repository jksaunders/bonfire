import React from "react";
import { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, withKnobs } from "@storybook/addon-knobs";

import Button from "./Button";

storiesOf("Button", module)
  .addDecorator(withKnobs)
  .add("with text", () => <Button onClick={action("clicked")}>Hello Button</Button>)
  .add("with some emoji", () => {
    const themeMode = select("Theme Mode", ["light", "dark"], "light");
    const themeLayout = select("Theme Layout", ["cozy", "compact"], "cozy");
    const theme = { mode: themeMode, layout: themeLayout };
    return (
      <ThemeProvider theme={theme}>
        <Button onClick={action("clicked")}>
          <span role="img" aria-label="so cool">
            😀 😎 👍 💯
            {" "}
            {themeMode}
          </span>
        </Button>
      </ThemeProvider>
    );
  });