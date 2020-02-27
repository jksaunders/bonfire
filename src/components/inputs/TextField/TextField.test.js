import React from 'react';
import {
  expectExists,
  expectSnapshot,
  fireEvent,
  render,
} from '../../../testing';
import TextField from './TextField';

const placeholder = 'input placeholder';

const getTextField = (props = {}, children) =>
  render(
    <TextField {...props} placeholder={placeholder}>
      {children}
    </TextField>
  );

const typeLetters = (node, value) =>
  fireEvent.input(node, { target: { value } });

test('renders', () => {
  const { component } = getTextField();
  expectExists(component);
  expectSnapshot(component);
});

test('`data-test` prop', () => {
  const { component, getByPlaceholderText } = getTextField({
    'data-test': 'testId',
  });
  expectExists(component);
  expectSnapshot(component);
  expect(getByPlaceholderText(placeholder)).toHaveAttribute(
    'data-test',
    'testId'
  );
});

describe('as textarea', () => {
  test('renders', () => {
    const { component, getByPlaceholderText } = getTextField({
      textArea: true,
    });
    expectExists(component);
    expectSnapshot(component);
    expectExists(getByPlaceholderText(placeholder));
    expect(getByPlaceholderText(placeholder).tagName.toLowerCase()).toBe(
      'textarea'
    );
  });
});

describe('validation', () => {
  const validate = text => text.length === 5;

  describe('error is passed as a prop', () => {
    const errorMessage = 'test error';

    test('error is shown when input is valid', () => {
      const { component, getByText, getByPlaceholderText } = getTextField({
        validate,
        error: errorMessage,
      });

      getByText(errorMessage);
      expectSnapshot(component);

      const textField = getByPlaceholderText(placeholder);

      typeLetters(textField, '12345');

      expect(getByPlaceholderText(placeholder).value).toEqual('12345');
      expect(getByText(errorMessage)).toBeInTheDocument();
    });

    test.todo('error is shown when input is not valid');
  });
});
