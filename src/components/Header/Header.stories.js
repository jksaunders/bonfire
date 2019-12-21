import React, { useState } from 'react';
import { useGesture } from 'react-use-gesture';
import styled from 'styled-components';

import { action } from '@storybook/addon-actions';
import { boolean, select, withKnobs } from '@storybook/addon-knobs';

import Header from './Header';

const StoryHeader = styled(Header)`
  background: linear-gradient(270deg, #eeeeee 0%, white 100%);
`;

export default {
  title: 'Containers|Header',
  component: Header,
  decorators: [withKnobs],
};

export const NoLogo = () => {
  const variant = select(
    'Header Layout',
    Object.keys(Header.CONSTANTS.VARIANT)
  );
  const showFloatingHeader = boolean('Show Floating Header', false);

  return (
    <div>
      <StoryHeader
        buttons={[
          {
            text: 'Donate',
            onClick: action('Donate'),
            variant: Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY,
          },
        ]}
        height="125px"
        items={[
          { text: 'Programs', link: 'https://google.com' },
          { text: 'About Us', onClick: action('About Us') },
          { text: 'Events', onClick: action('Events') },
          { text: 'Contact Us', onClick: action('Contact Us') },
        ]}
        variant={variant}
        showFloatingHeader={showFloatingHeader}
      />
    </div>
  );
};

export const WithLogo = () => {
  const variant = select(
    'Header Layout',
    Object.keys(Header.CONSTANTS.VARIANT)
  );
  const showFloatingHeader = boolean('Show Floating Header', false);

  return (
    <div>
      <StoryHeader
        buttons={[
          {
            text: 'Donate',
            onClick: action('Donate'),
            variant: Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY,
          },
        ]}
        height="125px"
        items={[
          { text: 'Programs', link: 'https://google.com' },
          { text: 'About Us', onClick: action('About Us') },
          { text: 'Events', onClick: action('Events') },
          { text: 'Contact Us', onClick: action('Contact Us') },
        ]}
        logo={{
          image:
            'https://kidsupfront.com/wp-content/uploads/2019/01/KUF-Color-150.png',
        }}
        variant={variant}
        showFloatingHeader={showFloatingHeader}
      />
    </div>
  );
};

export const AutoFloatingHeader = () => <AutoFloatingHeaderStory />;

const AutoFloatingHeaderStory = () => {
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const headerHeight = 125;

  const bind = useGesture(
    {
      onScroll: scrollState => {
        if (scrollState.xy[1] > headerHeight !== showFloatingHeader) {
          setShowFloatingHeader(!showFloatingHeader);
        }
      },
    },
    { event: { passive: false } }
  );

  return (
    <div {...bind()} style={{ height: '400px', overflowY: 'scroll' }}>
      <StoryHeader
        buttons={[
          {
            text: 'Donate',
            onClick: action('Donate'),
            variant: Header.HeaderButton.CONSTANTS.VARIANT.PRIMARY,
          },
        ]}
        items={[
          { text: 'Programs', link: 'https://google.com' },
          { text: 'About Us', onClick: action('About Us') },
          { text: 'Events', onClick: action('Events') },
          { text: 'Contact Us', onClick: action('Contact Us') },
        ]}
        logo={{
          image:
            'https://kidsupfront.com/wp-content/uploads/2019/01/KUF-Color-150.png',
        }}
        variant={Header.CONSTANTS.VARIANT.FULL}
        showFloatingHeader={showFloatingHeader}
        height={`${headerHeight}px`}
      />
      <div style={{ height: '1000px' }}>Content!</div>
    </div>
  );
};
