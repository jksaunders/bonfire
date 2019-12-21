import React, { useState } from 'react';
import styled from 'styled-components';

import { withKnobs } from '@storybook/addon-knobs';

import { Button } from '../..';
import Drawer from './Drawer';

const StoryWrapper = styled.div``;
const StoryDrawer = styled(Drawer)`
  padding: 32px;
`;
const DrawerContent = styled.div`
  background-color: lightblue;
  color: white;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 200px;
`;

const DrawerStory = () => {
  const [open, setIsOpen] = useState(false);
  return (
    <StoryWrapper>
      <Button onClick={() => setIsOpen(!open)} text="Drawer" />
      <StoryDrawer onClose={() => setIsOpen(!open)} open={open}>
        <DrawerContent>Hi!</DrawerContent>
      </StoryDrawer>
    </StoryWrapper>
  );
};

export default {
  title: 'Containers|Drawer',
  component: Drawer,
  decorators: [withKnobs],
};

export const DrawerDefaultStory = () => <DrawerStory />;

Drawer.story = {
  name: 'with text',
};
