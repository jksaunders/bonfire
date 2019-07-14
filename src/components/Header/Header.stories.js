import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
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
          <div>
            <StoryHeader>
              <Header.HeaderItem text="Programs" link="https://gooogle.com" />
              <Header.HeaderItem text="About Us" />
              <Header.HeaderItem text="Events" />
              <Header.HeaderItem text="Contact Us" />
              <Header.HeaderButton text="Donate" variant={Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY} />
            </StoryHeader>
          </div>
        </div>
      </ThemeProvider>
    );
  });