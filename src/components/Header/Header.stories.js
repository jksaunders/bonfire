import React, { useState } from "react";
import { useGesture } from "react-use-gesture";
import styled, { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../theming";
import Header from "./Header";

const StoryHeader = styled(Header)`
  background: linear-gradient(270deg, #EEEEEE 0%, white 100%);
`;

const AutoFloatingHeaderStory = () => {
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const headerHeight = 125;

  const bind = useGesture(
    {
      onScroll: (scrollState) => {
        if ((scrollState.xy[1] > headerHeight) !== showFloatingHeader) {
          setShowFloatingHeader(!showFloatingHeader);
        }
      },
    },
    { event: { passive: false } }
  );

  return (
    <div {...bind()} style={{ height: "400px", overflowY: "scroll" }}>
      <StoryHeader
        buttons={[
          { text: "Donate", onClick: action("Donate"), variant: Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY }
        ]}
        items={[
          { text: "Programs", link: "https://google.com" },
          { text: "About Us", onClick: action("About Us") },
          { text: "Events", onClick: action("Events") },
          { text: "Contact Us", onClick: action("Contact Us") }
        ]}
        logo={{ image: "https://kidsupfront.com/wp-content/uploads/2019/01/KUF-Color-150.png" }}
        variant={Header.CONSTANTS.VARIANT.FULL}
        showFloatingHeader={showFloatingHeader}
        height={`${headerHeight}px`}
      />
      <div style={{ height: "1000px" }}>Content!</div>
    </div>
  );
};

storiesOf("Header", module)
  .addDecorator(withKnobs)
  .add("no logo", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };
    const variant = select("Header Layout", Object.keys(Header.CONSTANTS.VARIANT));
    const showFloatingHeader = boolean("Show Floating Header", false);

    return (
      <ThemeProvider theme={theme}>
        <div>
          <StoryHeader
            buttons={[
              { text: "Donate", onClick: action("Donate"), variant: Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY }
            ]}
            height="125px"
            items={[
              { text: "Programs", link: "https://google.com" },
              { text: "About Us", onClick: action("About Us") },
              { text: "Events", onClick: action("Events") },
              { text: "Contact Us", onClick: action("Contact Us") }
            ]}
            variant={variant}
            showFloatingHeader={showFloatingHeader}
          />
        </div>
      </ThemeProvider>
    );
  })
  .add("with logo", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };
    const variant = select("Header Layout", Object.keys(Header.CONSTANTS.VARIANT));
    const showFloatingHeader = boolean("Show Floating Header", false);

    return (
      <ThemeProvider theme={theme}>
        <div>
          <StoryHeader
            buttons={[
              { text: "Donate", onClick: action("Donate"), variant: Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY }
            ]}
            height="125px"
            items={[
              { text: "Programs", link: "https://google.com" },
              { text: "About Us", onClick: action("About Us") },
              { text: "Events", onClick: action("Events") },
              { text: "Contact Us", onClick: action("Contact Us") }
            ]}
            logo={{ image: "https://kidsupfront.com/wp-content/uploads/2019/01/KUF-Color-150.png" }}
            variant={variant}
            showFloatingHeader={showFloatingHeader}
          />
        </div>
      </ThemeProvider>
    );
  })
  .add("auto floating header", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };

    return (
      <ThemeProvider theme={theme}>
        <AutoFloatingHeaderStory />
      </ThemeProvider>
    );
  });