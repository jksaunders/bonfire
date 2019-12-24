import chroma from 'chroma-js';

const applyChroma = (stringValue, { alpha }) => {
  let result = chroma(stringValue);
  if (alpha) {
    result = result.alpha(alpha);
  }
  return result.hex();
};

const cssBackground = ({ background: backgroundProp }, chromaProps = {}) => {
  if (backgroundProp == null) {
    return '';
  }

  if (typeof backgroundProp === 'string') {
    if (backgroundProp.includes('rgb') || backgroundProp.includes('hsla')) {
      return `background-color: ${backgroundProp};`;
    }

    try {
      return `background-color: ${applyChroma(backgroundProp, chromaProps)};`;
    } catch (error) {
      return '';
    }
  }

  return '';
};

export default cssBackground;
