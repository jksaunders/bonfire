import React, { useState } from 'react';

import { withKnobs } from '@storybook/addon-knobs';

import Button from '../../Button';
import Dialog from './Dialog';

export default {
  title: 'Containers|Dialog',
  component: Dialog,
  decorators: [withKnobs],
};

export const DialogStory = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Button text="Open dialog" onClick={() => setOpen(!open)} />
      <Dialog onClose={() => setOpen(false)} open={open}>
        pls
      </Dialog>
    </div>
  );
};

DialogStory.story = {
  name: 'with text',
};
