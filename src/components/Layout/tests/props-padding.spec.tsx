import React from 'react';
import render from '../../../test-utils/render';
import { Layout } from '../Layout';

describe('padding', () => {
  interface TestCase {
    padding?: string;
    expected: string | undefined;
    title: string;
  }

  const testCases: TestCase[] = [
    {
      expected: undefined,
      title: 'no padding',
    },
    {
      expected: '10px',
      padding: '10px',
      title: 'padding',
    },
  ];

  testCases.forEach(({ expected, padding, title }) => {
    test(title, () => {
      const { hasStyle, takeSnapshot } = render(
        <Layout padding={padding}>content</Layout>
      );

      hasStyle({ padding: expected });

      takeSnapshot();
    });
  });
});
