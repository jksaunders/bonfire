import React from 'react';
import render from '../../../test-utils/render';
import { AlignCombinations } from '../AlignProp';
import { Layout } from '../Layout';

describe('align', () => {
  interface TestCase {
    alignProp?: AlignCombinations | undefined;
    expectedAlignContent?: string;
    expectedAlignItems?: string;
    expectedJustifyContent?: string;
    expectedJustifyItems?: string;
    title: string;
  }

  const testCases: TestCase[] = [
    {
      title: 'no align prop',
    },
    {
      alignProp: 'center',
      expectedAlignItems: 'center',
      expectedJustifyItems: 'center',
      title: 'single items align',
    },
    {
      alignProp: 'center end',
      expectedAlignItems: 'end',
      expectedJustifyItems: 'center',
      title: 'two items align',
    },
    {
      alignProp: 'center center',
      expectedAlignItems: 'center',
      expectedJustifyItems: 'center',
      title: 'two identical items align',
    },
    {
      alignProp: 'center content-center',
      expectedAlignContent: 'center',
      expectedJustifyItems: 'center',
      title: 'mixed items/content align',
    },
    {
      alignProp: 'content-flex-end',
      expectedAlignContent: 'flex-end',
      expectedJustifyContent: 'flex-end',
      title: 'two content align',
    },
    {
      alignProp: 'content-flex-end content-center',
      expectedAlignContent: 'center',
      expectedJustifyContent: 'flex-end',
      title: 'two content align',
    },
  ];

  testCases.forEach(
    ({
      alignProp,
      expectedAlignContent,
      expectedAlignItems,
      expectedJustifyContent,
      expectedJustifyItems,
      title,
    }) => {
      test(title, () => {
        const { hasStyle, takeSnapshot } = render(
          <Layout align={alignProp}>content</Layout>
        );

        hasStyle({ 'align-content': expectedAlignContent });
        hasStyle({ 'align-items': expectedAlignItems });
        hasStyle({ 'justify-content': expectedJustifyContent });
        hasStyle({ 'justify-items': expectedJustifyItems });

        takeSnapshot();
      });
    }
  );
});
