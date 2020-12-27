import React from 'react';
import styled from 'styled-components';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { Layout, LayoutProps } from './Layout';

export default {
  title: 'Components/Layout',
  component: Layout,
  argTypes: {
    align: { control: 'text' },
    column: { control: 'boolean' },
    full: { control: 'boolean' },
    fullHeight: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    gap: { control: 'text' },
    row: { control: 'boolean' },
  },
} as Meta;

const Content = styled.div`
  background-color: lightblue;
  padding: 10px;
`;

const Template: Story<LayoutProps> = (args) => (
  <Layout {...args}>
    <Content>hi</Content>
    <Content>hi</Content>
    <Content>hi</Content>
    <Content>hi</Content>
    <Content>hi</Content>
    <Content>hi</Content>
    <Content>hi</Content>
    <Content>hi</Content>
  </Layout>
);

export const Primary = Template.bind({});
Primary.args = {};
