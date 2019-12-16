/* eslint-disable import/no-extraneous-dependencies */
import { render as importedRender } from '@testing-library/react';
import 'jest-styled-components';

export const render = component => {
  const rendered = importedRender(component);
  return {
    ...rendered,
    component: rendered.container.firstChild,
  };
};

export const expectSnapshot = component => {
  expect(component).toMatchSnapshot();
};

export const expectExists = component => {
  expect(component).not.toEqual(null);
  expect(component).toBeInTheDocument();
};

export const expectStyle = (component, key, value) => {
  expect(component).toHaveStyleRule(key, value);
};
