import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../theming";
import Header from "./Header";

const StoryHeader = styled(Header)`
  background: linear-gradient(270deg, #48C9B0 0%, white 100%);
`;

storiesOf("Header", module)
  .addDecorator(withKnobs)
  .add("with text", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };

    return (
      <ThemeProvider theme={theme}>
        <div>
          <StoryHeader>
            <Header.HeaderItem text="Programs" link="https://google.com" />
            <Header.HeaderItem text="About Us" onClick={action("About Us")} />
            <Header.HeaderItem text="Events" onClick={action("Events")} />
            <Header.HeaderItem text="Contact Us" onClick={action("Contact Us")} />
            <Header.HeaderButton text="Donate" onClick={action("Donate")} variant={Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY} />
          </StoryHeader>
        </div>
      </ThemeProvider>
    );
  });