/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import ThemeContext, { ThemeRoot, withThemes } from './ThemeContext';

export default {
  title: 'Theming|Theming',
  decorators: [withKnobs],
};

const TestComponent = () => {
  const { getCurrentVariant, setCurrentTheme, theme } = useContext(
    ThemeContext
  );
  return (
    <button
      onClick={() => {
        setCurrentTheme({
          mode: theme.current.mode === 'light' ? 'dark' : 'light',
        });
      }}
    >
      {getCurrentVariant('button', 'primary').backgroundColor}
    </button>
  );
};

const InnerComponent = ({ bonfireTheme }) => {
  const { getCurrentVariant, setCurrentTheme, theme } = bonfireTheme;
  return (
    <button
      onClick={() => {
        setCurrentTheme({
          mode: theme.current.mode === 'light' ? 'dark' : 'light',
        });
      }}
    >
      {getCurrentVariant('button', 'primary').backgroundColor}
    </button>
  );
};

const HOCThemed = withThemes(InnerComponent);

export const ThemeStory = () => {
  const value = {
    current: {
      mode: 'light',
    },
    variants: {
      components: {
        button: {
          primary: {
            backgroundColor: ({ mode }) =>
              ({ light: 'blue', dark: 'grey' }[mode]),
          },
          secondary: {
            backgroundColor: 'teal',
          },
        },
      },
    },
  };

  return (
    <ThemeRoot initialTheme={value}>
      <TestComponent />
    </ThemeRoot>
  );
};

export const HOCStory = () => {
  const value = {
    current: {
      mode: 'light',
    },
    variants: {
      components: {
        button: {
          primary: {
            backgroundColor: ({ mode }) =>
              ({ light: 'blue', dark: 'grey' }[mode]),
          },
          secondary: {
            backgroundColor: 'teal',
          },
        },
      },
    },
  };

  return (
    <ThemeRoot initialTheme={value}>
      <HOCThemed />
    </ThemeRoot>
  );
};
