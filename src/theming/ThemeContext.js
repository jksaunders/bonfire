import React, { useState, useContext } from 'react';

const ThemeContext = React.createContext(null);

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

    if (theme.variants == null) {
      throw new Error('Theme missing `variants` field');
    }
    if (theme.variants.components == null) {
      throw new Error('`theme.variants` missing `components` field');
    }
    if (theme.variants.components[componentKey] == null) {
      throw new Error(
        `\`theme.variants.components\` missing \`${componentKey}\` field`
      );
    }
    if (theme.variants.components[componentKey][variantKey] == null) {
      throw new Error(
        `\`theme.variants.components.${componentKey}\` missing \`${variantKey}\` field`
      );
    }

    const variant = theme.variants.components[componentKey][variantKey];

    if (typeof variant !== 'object') {
      return {};
    }

    Object.keys(variant).forEach(propKey => {
      const variantValue =
        theme.variants.components[componentKey][variantKey][propKey];

      result[propKey] =
        typeof variantValue === 'function'
          ? variantValue(theme.current)
          : variantValue;
    });

    return result;
  };

  return {
    theme,
    getCurrentVariant,
    setCurrentTheme,
  };
};

export const bonfireThemePropKey = 'bonfireTheme';
export const bonfireThemeVariantPropKey = 'variant';

export const withThemes = Component => props => {
  const theme = useContext(ThemeContext);
  const bonfireProps = { [bonfireThemePropKey]: theme };
  return <Component {...props} {...bonfireProps} />;
};

// eslint-disable-next-line react/prop-types
export const ThemeRoot = ({ children, initialTheme }) => {
  const themeRoot = useTheme(initialTheme);
  return (
    <ThemeContext.Provider value={themeRoot}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
