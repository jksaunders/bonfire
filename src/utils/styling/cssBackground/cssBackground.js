const cssBackground = ({ background: backgroundProp }) => {
  if (backgroundProp == null) {
    return '';
  }

  if (typeof backgroundProp === 'string') {
    if (
      backgroundProp[0] === '#' ||
      backgroundProp.includes('hsl') ||
      backgroundProp.includes('rgb')
    ) {
      return `background-color: ${backgroundProp};`;
    }
  }

  return '';
};

export default cssBackground;
