import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from '../debounce';

export const ResponsiveSizesContext = React.createContext({});

const propTypes = {
  children: PropTypes.node,
  debounce: PropTypes.number,
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      height: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }),
      width: PropTypes.shape({
        min: PropTypes.number,
        max: PropTypes.number,
      }),
    })
  ),
};

const defaultProps = {
  children: null,
  debounce: 150,
  presets: {},
};

const ResponsiveRoot = ({ children, presets, debounce: debounceValue }) => {
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const calculatedPresets = {};
  Object.keys(presets).forEach(k => {
    const preset = presets[k];
    const valid =
      (preset.height == null ||
        ((preset.height.max == null ||
          windowSize.height <= preset.height.max) &&
          (preset.height.min == null ||
            windowSize.height >= preset.height.min))) &&
      (preset.width == null ||
        ((preset.width.max == null || windowSize.width <= preset.width.max) &&
          (preset.width.min == null || windowSize.width >= preset.width.min)));

    calculatedPresets[k] = valid;
  });

  useEffect(() => {
    const listener = debounce(() => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, debounceValue);

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize', listener);
    };
  }, [debounceValue]);

  return (
    <ResponsiveSizesContext.Provider
      value={{ windowSize, ...calculatedPresets }}
    >
      {children}
    </ResponsiveSizesContext.Provider>
  );
};

ResponsiveRoot.propTypes = propTypes;
ResponsiveRoot.defaultProps = defaultProps;

export default ResponsiveRoot;
