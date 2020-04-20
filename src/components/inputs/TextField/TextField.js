import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box, { BoxPropTypes, BoxDefaultProps } from '../../containers/Box';
import Layout from '../../containers/Layout';
import Typography from '../../Typography';

const propTypes = {
  ...BoxPropTypes,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      message: PropTypes.string,
      color: PropTypes.string,
    }),
  ]),
  label: PropTypes.string,
  name: PropTypes.string,
  onInput: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  showError: PropTypes.bool,
  textArea: PropTypes.bool,
  validate: PropTypes.func,
};

const defaultProps = {
  ...BoxDefaultProps,
  label: null,
  name: null,
  onInput: null,
  onSubmit: null,
  placeholder: null,
  showError: true,
  textArea: false,
  validate: null,
};

const borderColor = 'rgba(102,119,136,.2)';

const StyledInput = styled(Box)`
  width: 100%;
  ::placeholder {
    color: ${borderColor};
    font-size: 1rem;
  }
`;

const getError = (error) => {
  if (typeof error === 'string') {
    return error;
  }
  return '';
};

const validateString = (string, validate, currentError, setError) => {
  if (validate == null) {
    return;
  }

  const error = validate(string);
  if (error !== currentError) {
    if (error != null) {
      setError(error);
    } else {
      setError(null);
    }
  }
};

const getOnInput = ({ onInput, validate, currentError, setError }) => {
  if (onInput == null && validate == null) {
    return null;
  }

  return (e) => {
    if (onInput != null) {
      onInput(e.target.value);
    }
    validateString(e.target.value, validate, currentError, setError);
  };
};

const getOnKeyUp = ({ onSubmit }) => {
  if (onSubmit == null) {
    return null;
  }

  return (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      onSubmit();
    }
  };
};

const TextField = ({
  error: errorProp,
  height,
  label,
  maxHeight,
  minHeight,
  maxWidth,
  minWidth,
  name,
  onInput,
  onSubmit,
  placeholder,
  showError,
  textArea,
  validate,
  width,
  ...rest
}) => {
  const [error, setError] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // check error on render as well as onInput
    if (
      inputRef != null &&
      inputRef.current != null &&
      validate != null &&
      errorProp == null &&
      error != null
    ) {
      validateString(inputRef.current.value, validate, error, setError);
    }
  }, [validate, errorProp, error]);

  return (
    <Layout
      gap="4px"
      height={height}
      maxHeight={maxHeight}
      minHeight={minHeight}
      maxWidth={maxWidth}
      minWidth={minWidth}
      width={width}
    >
      <label>
        <Typography size="14px">{label}</Typography>
      </label>
      <StyledInput
        {...rest}
        border={`1px solid ${borderColor}`}
        borderRadius="5px"
        component={textArea ? 'textarea' : 'input'}
        padding="3px"
        type="text"
        name={name}
        onInput={getOnInput({ onInput, validate, error, setError })}
        onKeyUp={getOnKeyUp({ onSubmit })}
        placeholder={placeholder}
        ref={inputRef}
      />
      {(errorProp || error) && showError && (
        <Typography size="14px">{getError(errorProp || error)}</Typography>
      )}
    </Layout>
  );
};

TextField.propTypes = propTypes;
TextField.defaultProps = defaultProps;

export default TextField;
