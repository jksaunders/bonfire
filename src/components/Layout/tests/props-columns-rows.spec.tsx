import React from 'react';
import render from '../../../test-utils/render';
import { ResponsiveProp } from '../../../utils/ResponsiveProps';
import { Layout } from '../Layout';

type StringMediaPair = [value: string, media?: string];

describe('non-responsive', () => {
  interface TestCase {
    columns?: ResponsiveProp<string>;
    expectedGridAutoColumns?: StringMediaPair[];
    expectedGridAutoRows?: StringMediaPair[];
    expectedGridTemplateColumns?: StringMediaPair[];
    expectedGridTemplateRows?: StringMediaPair[];
    rows?: ResponsiveProp<string>;
    title: string;
  }

  const testCases: TestCase[] = [
    {
      title: 'no columns, no rows',
    },
    {
      columns: '10px',
      expectedGridAutoColumns: [['10px']],
      title: 'single value column',
    },
    {
      expectedGridAutoRows: [['10px']],
      rows: '10px',
      title: 'single value rows',
    },
    {
      columns: '10px 12px',
      expectedGridTemplateColumns: [['10px 12px']],
      title: 'multiple value columns',
    },
    {
      expectedGridTemplateRows: [['10px 12px']],
      rows: '10px 12px',
      title: 'multiple value rows',
    },
    {
      // Responsive tests can't check @media style rules
      columns: {
        '_-200px': '10px',
        '200px-_': 'repeat(auto-fill, 10px)',
      },
      expectedGridAutoColumns: [['10px', '@media all and (max-width:200px)']],
      title: 'responsive columns',
    },
  ];

  testCases.forEach(
    ({
      columns,
      expectedGridAutoColumns,
      expectedGridAutoRows,
      expectedGridTemplateColumns,
      expectedGridTemplateRows,
      rows,
      title,
    }) => {
      test(title, () => {
        const { hasStyle, takeSnapshot } = render(
          <Layout columns={columns} rows={rows}>
            content
          </Layout>
        );

        expectedGridAutoColumns?.forEach(([value, media]) => {
          if (media) {
          } else {
            hasStyle(
              { 'grid-auto-columns': value },
              media ? { media } : undefined
            );
          }
        });

        expectedGridAutoRows?.forEach(([value, media]) => {
          if (media) {
          } else {
            hasStyle(
              { 'grid-auto-rows': value },
              media ? { media } : undefined
            );
          }
        });

        expectedGridTemplateColumns?.forEach(([value, media]) => {
          if (media) {
          } else {
            hasStyle(
              { 'grid-template-columns': value },
              media ? { media } : undefined
            );
          }
        });

        expectedGridTemplateRows?.forEach(([value, media]) => {
          if (media) {
          } else {
            hasStyle(
              { 'grid-template-rows': value },
              media ? { media } : undefined
            );
          }
        });

        takeSnapshot();
      });
    }
  );
});
