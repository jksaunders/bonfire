import React from 'react';
import render from '../../../test-utils/render';
import { BonfireRoot } from '../../BonfireRoot';
import { Layout } from '../Layout';

describe('gap', () => {
  describe('without context', () => {
    interface TestCase {
      expected: string | undefined;
      gapProp?: boolean | string;
      title: string;
    }

    const testCases: TestCase[] = [
      {
        expected: undefined,
        title: 'no value',
      },
      {
        expected: '40px',
        gapProp: '40px',
        title: 'prop value',
      },
      {
        expected: undefined,
        gapProp: true,
        title: 'prop true',
      },
    ];

    testCases.forEach(({ expected, gapProp, title }) => {
      test(title, () => {
        const { hasStyle, takeSnapshot } = render(
          <Layout gap={gapProp}>content</Layout>
        );

        hasStyle({ 'grid-gap': expected });
        takeSnapshot();
      });
    });
  });

  describe('with context', () => {
    interface TestCase {
      expected: string | undefined;
      layoutContextDefaultGap?: string;
      gapProp?: boolean | string;
      title: string;
    }

    const testCases: TestCase[] = [
      {
        expected: undefined,
        title: 'no value',
      },
      {
        expected: '40px',
        gapProp: '40px',
        title: 'prop value',
      },
      {
        expected: undefined,
        layoutContextDefaultGap: '30px',
        title: 'context value, no prop value',
      },
      {
        expected: undefined,
        gapProp: true,
        title: 'no context value, prop true',
      },
      {
        expected: '30px',
        layoutContextDefaultGap: '30px',
        gapProp: true,
        title: 'context value, prop true',
      },
      {
        expected: '40px',
        layoutContextDefaultGap: '30px',
        gapProp: '40px',
        title: 'context value, prop value override',
      },
    ];

    testCases.forEach(
      ({ expected, gapProp, layoutContextDefaultGap, title }) => {
        test(title, () => {
          const { hasStyle, takeSnapshot } = render(
            <BonfireRoot
              layout={
                layoutContextDefaultGap
                  ? { defaultGap: layoutContextDefaultGap }
                  : {}
              }
            >
              <Layout gap={gapProp}>content</Layout>
            </BonfireRoot>
          );

          hasStyle({ 'grid-gap': expected });
          takeSnapshot();
        });
      }
    );
  });
});
