import React from 'react';
import Typography, { MaterialVariants } from '../components/Typography';
import * as Colors from './colors';

export default {
  title: 'Style|Colors',
};

export const AllColorsStory = () => (
  <div>
    { Object.keys(Colors).map(key => (
      <div key={key} style={{ backgroundColor: Colors[key] }}>
        <Typography variant={MaterialVariants.Body1} spaceAfter={false}>{`${key}: ${Colors[key]}`}</Typography>
      </div>
    )) }
  </div>
);

AllColorsStory.story = {
  name: 'All colors'
};