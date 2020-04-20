/* eslint-disable max-len */
import React, { useContext } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import Typography, { MaterialVariants } from '.';
import { ThemeContext, ThemeRoot, colors } from '../../theming';

export default {
  title: 'Style|Typography',
  component: Typography,
  decorators: [withKnobs],
};

export const AllStyles = () => (
  <div>
    <div>
      <Typography variant={MaterialVariants.H1}>h1</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.H2}>h2</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.H3}>h3</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.H4}>h4</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.H5}>h5</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.H6}>h6</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.Subtitle1}>subtitle1</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.Subtitle2}>subtitle2</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.Body1}>body1</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.Body2}>body2</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.Caption}>caption</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.ButtonText}>button</Typography>
    </div>
    <div>
      <Typography variant={MaterialVariants.Overline}>overline</Typography>
    </div>
  </div>
);

const ThemeChanger = () => {
  const { theme, setCurrentTheme } = useContext(ThemeContext);
  return (
    <div>
      <button
        onClick={() => {
          setCurrentTheme({
            mode: theme.current.mode === 'light' ? 'dark' : 'light',
          });
        }}
      >
        {theme.current.mode}
      </button>
    </div>
  );
};

const themedMaterialVariants = () => {
  const result = {};
  Object.keys(MaterialVariants).forEach((k) => {
    result[k] = {
      ...MaterialVariants[k],
      color: ({ mode }) =>
        mode === 'light' ? MaterialVariants[k].color : colors.lightGrey,
    };
  });
  return result;
};

export const AllStylesThemed = () => (
  <ThemeRoot
    initialTheme={{
      current: {
        mode: 'light',
      },
      variants: {
        components: {
          typography: themedMaterialVariants(),
        },
      },
    }}
  >
    <div>
      <ThemeChanger />
      <div>
        <Typography variant="H1">h1</Typography>
      </div>
      <div>
        <Typography variant="H2">h2</Typography>
      </div>
      <div>
        <Typography variant="H3">h3</Typography>
      </div>
      <div>
        <Typography variant="H4">h4</Typography>
      </div>
      <div>
        <Typography variant="H5">h5</Typography>
      </div>
      <div>
        <Typography variant="H6">h6</Typography>
      </div>
      <div>
        <Typography variant="Subtitle1">subtitle1</Typography>
      </div>
      <div>
        <Typography variant="Subtitle2">subtitle2</Typography>
      </div>
      <div>
        <Typography variant="Body1">body1</Typography>
      </div>
      <div>
        <Typography variant="Body2">body2</Typography>
      </div>
      <div>
        <Typography variant="Caption">caption</Typography>
      </div>
      <div>
        <Typography variant="ButtonText">button</Typography>
      </div>
      <div>
        <Typography variant="Overline">overline</Typography>
      </div>
    </div>
  </ThemeRoot>
);

export const SampleText = () => (
  <div>
    <div>
      <Typography variant={MaterialVariants.H1}>Welcome to bonfire</Typography>
      <Typography variant={MaterialVariants.H3}>
        This is its typography.
      </Typography>
      <Typography variant={MaterialVariants.Body1}>
        Typography is the art and technique of arranging type to make written
        language legible, readable, and appealing when displayed. The
        arrangement of type involves selecting typefaces, point sizes, line
        lengths, line-spacing (leading), and letter-spacing (tracking), and
        adjusting the space between pairs of letters (kerning). The term
        typography is also applied to the style, arrangement, and appearance of
        the letters, numbers, and symbols created by the process. Type design is
        a closely related craft, sometimes considered part of typography; most
        typographers do not design typefaces, and some type designers do not
        consider themselves typographers. Typography also may be used as a
        decorative device, unrelated to communication of information.
      </Typography>
      <Typography variant={MaterialVariants.Body1}>
        Typography is the work of typesetters (also known as compositors),
        typographers, graphic designers, art directors, manga artists, comic
        book artists, graffiti artists, and, now, anyone who arranges words,
        letters, numbers, and symbols for publication, display, or distribution,
        from clerical workers and newsletter writers to anyone self-publishing
        materials. Until the Digital Age, typography was a specialized
        occupation. Digitization opened up typography to new generations of
        previously unrelated designers and lay users. As the capability to
        create typography has become ubiquitous, the application of principles
        and best practices developed over generations of skilled workers and
        professionals has diminished. So at a time when scientific techniques
        can support the proven traditions (e.g., greater legibility with the use
        of serifs, upper and lower case, contrast, etc.) through understanding
        the limitations of human vision, typography as often encountered may
        fail to achieve its principal objective: effective communication.
      </Typography>
    </div>
  </div>
);
