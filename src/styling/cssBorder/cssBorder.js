const cssBorder = ({ border }) => {
  if (border == null) {
    return '';
  }
  return `border: ${border};`;
};

export default cssBorder;
