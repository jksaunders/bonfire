import React from 'react';
import render from '../../../test-utils/render';
import { Layout } from '../Layout';

describe('column + row', () => {
  interface TestCase {
    column?: boolean;
    expected: string | undefined;
    row?: boolean;
    title: string;
  }

  const testCases: TestCase[] = [
    {
      expected: undefined,
      title: 'no column, no row',
    },
    {
      column: true,
      expected: `row`,
      title: 'column',
    },
    {
      expected: `column`,
      row: true,
      title: 'row',
    },
  ];

  testCases.forEach(({ column, expected, row, title }) => {
    test(title, () => {
      const { hasStyle, takeSnapshot } = render(
        <Layout column={column} row={row}>
          content
        </Layout>
      );

      hasStyle({ 'grid-auto-flow': expected });

      takeSnapshot();
    });
  });
});
