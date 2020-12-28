import {
  render as testingReactRender,
  screen as testingReactScreen,
} from '@testing-library/react';
import 'jest-styled-components';

interface RenderResult extends ReturnType<typeof testingReactRender> {
  component: ChildNode | null;
  screen: typeof testingReactScreen;
  hasStyle: (
    style: string | Record<string, string | undefined>,
    options?: { media?: string; modifier?: string }
  ) => void;
  takeSnapshot: () => void;
}

const render = (ui: React.ReactElement): RenderResult => {
  const result = testingReactRender(ui);
  const component = result.container.firstChild;

  return {
    ...result,
    component,
    screen: testingReactScreen,
    hasStyle: (
      style: string | Record<string, string | undefined>,
      options?: { media?: string; modifier?: string }
    ): void => {
      if (typeof style === 'object') {
        Object.keys(style).forEach((styleKey) => {
          expect(component).toHaveStyleRule(styleKey, style[styleKey]);
        });
      } else if (typeof style === 'string') {
        const [key, value] = style
          .split(';')
          .join('')
          .split(':')
          .map((s) => s.trim());
        expect(component).toHaveStyleRule(key, value, options);
      }
    },
    takeSnapshot: (): void => {
      expect(component).toMatchSnapshot();
    },
  };
};

export default render;
