import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box, { BoxPropTypes, BoxDefaultProps } from '../containers/Box';
import Typography, { typographyPropTypes } from '../Typography';
import Progress from '../Progress';
import { getVariant, withThemes } from '../../theming/ThemeContext';
import { css, cssBackground } from '../../styling';

const StyledBox = styled(Box)`
  ${props => cssBackground(props, { alpha: props.disabled ? 0.5 : 1 })}
  ${css('cursor', 'cursor', props => (props.disabled ? 'auto' : props.cursor))}
`;

const buttonStyleProps = {
  ...BoxPropTypes,
  typography: PropTypes.shape(typographyPropTypes),
};

const propTypes = {
  ...buttonStyleProps,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  height: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  variant: PropTypes.oneOfType([
    PropTypes.shape(buttonStyleProps),
    PropTypes.string,
  ]),
};

const defaultProps = {
  ...BoxDefaultProps,
  /* eslint-disable react/default-props-match-prop-types */
  cursor: 'pointer',
  typography: null,
  /* eslint-enable react/default-props-match-prop-types */
  className: null,
  disabled: false,
  height: null,
  onClick: () => {},
  variant: null,
};

const Button = ({
  className,
  disabled,
  height,
  loading,
  onClick,
  text,
  width,
  ...props
}) => {
  const { typography, ...buttonVariant } = getVariant(
    'button',
    props,
    buttonStyleProps
  );
  return (
    <StyledBox
      className={className}
      component="button"
      disabled={disabled}
      height={height}
      onClick={onClick}
      text={text}
      width={width}
      {...buttonVariant}
    >
      {loading && (
        <Progress
          color={typography == null ? null : typography.color}
          size={typography.size}
        />
      )}
      {!loading && <Typography {...typography}>{text}</Typography>}
    </StyledBox>
  );
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

const ThemedButton = withThemes(Button);

export default ThemedButton;
