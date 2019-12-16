import React from 'react';
import {
  expectExists,
  expectSnapshot,
  expectStyle,
  render,
} from '../../../utils/snapshot';
import Layout from './Layout';
import { TypographyContext } from '../../Typography';

const getLayout = (props = {}, children) =>
  render(<Layout {...props}>{children}</Layout>);

test('with children', () => {
  const { component } = getLayout({}, <span>Hi!</span>);
  expectExists(component);
  expectSnapshot(component);
});

test('with no props', () => {
  const { component } = getLayout({});
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'display', 'grid');
  expectStyle(component, 'box-sizing', 'border-box');
});

test('with background properties', () => {
  const { component } = getLayout({ background: '#123456' });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'background-color', '#123456');
});

test('with border properties', () => {
  const { component } = getLayout({ borderRadius: '5px' });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'border-radius', '5px');
});

test('with grid properties: auto', () => {
  const { component } = getLayout({
    columns: '50px',
    flow: 'column',
    gap: '10px',
    rows: '100px',
  });

  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'grid-gap', '10px');
  expectStyle(component, 'grid-auto-flow', 'column');
  expectStyle(component, 'grid-auto-columns', '50px');
  expectStyle(component, 'grid-auto-rows', '100px');
});

test('with grid properties: templates', () => {
  const { component } = getLayout({
    columns: 'repeat(3, 3fr)',
    flow: 'row',
    gap: '10px',
    rows: '1fr 2fr',
  });

  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'grid-gap', '10px');
  expectStyle(component, 'grid-auto-flow', 'row');
  expectStyle(component, 'grid-template-columns', 'repeat(3,3fr)');
  expectStyle(component, 'grid-template-rows', '1fr 2fr');
});

test('with padding', () => {
  const { component } = getLayout({ padding: '10px' });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'padding', '10px');
});

test('centered', () => {
  const { component } = getLayout({ centered: true });
  expectExists(component);
  expectSnapshot(component);
  expectStyle(component, 'align-items', 'center');
  expectStyle(component, 'justify-items', 'center');
});

describe('using `align`', () => {
  describe('no target => defaults to `items`', () => {
    test('single alignment', () => {
      const { component } = getLayout({ align: 'center' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', 'center');
      expectStyle(component, 'justify-items', 'center');
    });

    test('single alignment: ignore first', () => {
      const { component } = getLayout({ align: '_ center' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', 'center');
      expectStyle(component, 'justify-items', undefined);
    });

    test('single alignment: ignore second', () => {
      const { component } = getLayout({ align: 'center _' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', undefined);
      expectStyle(component, 'justify-items', 'center');
    });

    test('horizontal + vertical alignment', () => {
      const { component } = getLayout({ align: 'center left' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', 'left');
      expectStyle(component, 'justify-items', 'center');
    });
  });

  describe('target = `items`', () => {
    test('single alignment', () => {
      const { component } = getLayout({ align: 'items-center' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', 'center');
      expectStyle(component, 'justify-items', 'center');
    });

    test('single alignment: ignore first', () => {
      const { component } = getLayout({ align: '_ items-center' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', 'center');
      expectStyle(component, 'justify-items', undefined);
    });

    test('single alignment: ignore second', () => {
      const { component } = getLayout({ align: 'items-center _' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', undefined);
      expectStyle(component, 'justify-items', 'center');
    });

    test('horizontal + vertical alignment', () => {
      const { component } = getLayout({ align: 'items-center items-left' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-items', 'left');
      expectStyle(component, 'justify-items', 'center');
    });
  });

  describe('target = `content`', () => {
    test('single alignment', () => {
      const { component } = getLayout({ align: 'content-center' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-content', 'center');
      expectStyle(component, 'justify-content', 'center');
    });

    test('single alignment: ignore first', () => {
      const { component } = getLayout({ align: '_ content-center' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-content', 'center');
      expectStyle(component, 'justify-content', undefined);
    });

    test('single alignment: ignore second', () => {
      const { component } = getLayout({ align: 'content-center _' });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-content', undefined);
      expectStyle(component, 'justify-content', 'center');
    });

    test('horizontal + vertical alignment', () => {
      const { component } = getLayout({
        align: 'content-flex-end content-left',
      });
      expectExists(component);
      expectSnapshot(component);
      expectStyle(component, 'align-content', 'left');
      expectStyle(component, 'justify-content', 'flex-end');
    });
  });
});

describe('using `TypographyContext`', () => {
  test('useTypography = false', () => {
    const { component, getByText } = render(
      <TypographyContext.Provider value={{ color: '#FFFFFF' }}>
        <Layout>Content</Layout>
      </TypographyContext.Provider>
    );

    expectExists(component);
    expectSnapshot(component);
    expect(getByText('Content')).not.toHaveStyleRule('color', '#FFFFFF');
  });

  test('useTypography = true', () => {
    const { component, getByText } = render(
      <TypographyContext.Provider value={{ color: '#FFFFFF' }}>
        <Layout useTypography>Content</Layout>
      </TypographyContext.Provider>
    );

    expectExists(component);
    expectSnapshot(component);
    expect(getByText('Content')).toHaveStyleRule('color', '#FFFFFF');
  });
});
