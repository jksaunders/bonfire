/* eslint-disable max-len */
import React from "react";
import { ThemeProvider } from "styled-components";

import { storiesOf } from "@storybook/react";
import { select, withKnobs } from "@storybook/addon-knobs";

import { ThemeConstants } from "../../theming";
import Typography from "./Typography";

storiesOf("Typography", module)
  .addDecorator(withKnobs)
  .add("all styles", () => {
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
  })
  .add("sample text", () => {
    const themeMode = select("Theme Mode", Object.keys(ThemeConstants.mode.values), Object.keys(ThemeConstants.mode.values)[0]);
    const themeLayout = select("Theme Layout", Object.keys(ThemeConstants.layout.values), Object.keys(ThemeConstants.layout.values)[0]);
    const theme = { mode: themeMode, layout: themeLayout };

    return (
      <ThemeProvider theme={theme}>
        <div>
          <div>
            <Typography.H1>Welcome to bonfire</Typography.H1>
            <Typography.H3>This is its typography.</Typography.H3>
            <Typography.Body1>
              Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing (leading), and letter-spacing (tracking), and adjusting the space between pairs of letters (kerning). The term typography is also applied to the style, arrangement, and appearance of the letters, numbers, and symbols created by the process. Type design is a closely related craft, sometimes considered part of typography; most typographers do not design typefaces, and some type designers do not consider themselves typographers. Typography also may be used as a decorative device, unrelated to communication of information.
            </Typography.Body1>
            <Typography.Body1>
              Typography is the work of typesetters (also known as compositors), typographers, graphic designers, art directors, manga artists, comic book artists, graffiti artists, and, now, anyone who arranges words, letters, numbers, and symbols for publication, display, or distribution, from clerical workers and newsletter writers to anyone self-publishing materials. Until the Digital Age, typography was a specialized occupation. Digitization opened up typography to new generations of previously unrelated designers and lay users. As the capability to create typography has become ubiquitous, the application of principles and best practices developed over generations of skilled workers and professionals has diminished. So at a time when scientific techniques can support the proven traditions (e.g., greater legibility with the use of serifs, upper and lower case, contrast, etc.) through understanding the limitations of human vision, typography as often encountered may fail to achieve its principal objective: effective communication.
            </Typography.Body1>
          </div>
        </div>
      </ThemeProvider>
    );
  });