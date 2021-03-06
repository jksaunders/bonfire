import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { css } from '../../../styling';
import Layout from '../Layout';

const propTypes = {
  children: PropTypes.node,
  fallbackColor: PropTypes.string,
  filter: PropTypes.string,
  muted: PropTypes.bool,
  parentLayoutProps: PropTypes.shape(Layout.shape).isRequired,
  src: PropTypes.string.isRequired,
};

const defaultProps = {
  children: null,
  fallbackColor: null,
  filter: null,
  muted: true,
};

const Container = styled(Layout)`
  position: relative;
`;

// eslint-disable-next-line react/prop-types
const MutableVideo = ({ className, src, type }) => {
  const ref = useRef();

  const getVideoElement = () => {
    if (!ref.current || !ref.current.children) {
      return null;
    }
    return ref.current.getElementsByTagName('video')[0];
  };

  const [{ isFirstLoad, videoCanPlay }, setState] = useState({
    isFirstLoad: true,
    videoCanPlay: false,
  });

  useEffect(() => {
    if (isFirstLoad) {
      const video = getVideoElement();
      if (video && video.readyState >= 4) {
        setState({
          isFirstLoad: false,
          videoCanPlay: true,
        });
      } else if (video) {
        video.addEventListener('canplaythrough', () => {
          setState({
            videoCanPlay: true,
          });
        });
        setState({
          isFirstLoad: false,
        });
      }
    }
  }, [isFirstLoad]);

  const dangerouslySetInnerHTML = {
    __html:
      isFirstLoad || videoCanPlay
        ? `
          <video
            autoplay
            loop
            muted
            playsinline
          >
            <source src="${src}" type=${type}>
          </video>
        `
        : `<div id="placeholder" />`,
  };

  return (
    <div
      className={className}
      ref={ref}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={dangerouslySetInnerHTML}
    />
  );
};

const Video = styled(MutableVideo)`
  > #placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
    object-fit: cover;
    ${css('fallbackColor', 'background-color')}
  }

  > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -100;
    object-fit: cover;
    ${css('filter')}
  }
`;

const VideoBackground = ({
  children,
  fallbackColor,
  filter,
  parentLayoutProps,
  src,
}) => (
  <Container {...parentLayoutProps}>
    <Video
      fallbackColor={fallbackColor}
      filter={filter}
      src={src}
      type="video/mp4"
    />
    {children}
  </Container>
);

VideoBackground.propTypes = propTypes;
VideoBackground.defaultProps = defaultProps;

export default VideoBackground;
