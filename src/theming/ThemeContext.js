import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext({});

const useTheme = (
  initialTheme = {
    current: {},
    variants: {
      components: { button: {}, typography: {} },
    },
  }
) => {
  const [theme, setTheme] = useState(initialTheme);

  const setCurrentTheme = newCurrent => {
    setTheme({
      ...theme,
      current: {
        ...theme.current,
        ...newCurrent,
      },
    });
  };

  const getCurrentVariant = (componentKey, variantKey) => {
    const result = {};
    Object.keys(theme.variants.components[componentKey][variantKey]).forEach(
      propKey => {
        const variantValue =
          theme.variants.components[componentKey][variantKey][propKey];

        result[propKey] =
          typeof variantValue === 'function'
            ? variantValue(theme.current)
            : variantValue;
      }
    );
    return result;
  };

  return {
    theme,
    getCurrentVariant,
    setCurrentTheme,
  };
};

export const withThemes = Component => props => {
  const theme = useContext(ThemeContext);
  return <Component {...props} bonfireTheme={theme} />;
};

// eslint-disable-next-line react/prop-types
export const ThemeRoot = ({ children, initialTheme }) => {
  const themeRoot = useTheme(initialTheme);
  return (
    <ThemeContext.Provider value={themeRoot}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
