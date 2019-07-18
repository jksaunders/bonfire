/* eslint-disable import/no-extraneous-dependencies */
import renderer from "react-test-renderer";

export const expectSnapshot = (mountedComponent) => {
  const component = renderer.create(mountedComponent);
  expect(component.toJSON()).toMatchSnapshot();
};