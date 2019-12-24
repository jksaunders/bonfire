const cssBackground = ({ background: backgroundProp }) => {
  if (backgroundProp == null) {
    return '';
  }

  if (typeof backgroundProp === 'string') {
    return `background-color: ${backgroundProp};`;
  }

  return '';
};

export default cssBackground;
