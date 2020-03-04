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
  const [{ isFirstLoad, videoCanPlay }, setState] = useState({
    isFirstLoad: true,
    videoCanPlay: false,
  });

  useEffect(() => {
    if (ref.current && ref.current.children && ref.current.children[0]) {
      if (ref.current.children[0].play != null) {
        setState({
          isFirstLoad: false,
          videoCanPlay: true,
        });
      } else {
        setState({
          isFirstLoad: false,
        });
      }
    }
  }, [videoCanPlay]);

  const dangerouslySetInnerHTMLProps = {
    dangerouslySetInnerHTML: {
      __html: `
        <video
          autoplay
          loop
          muted
          playsinline
        >
          <source src="${src}" type=${type}>
        </video>
`,
    },
  };

  return (
    <div
      className={className}
      ref={ref}
      // eslint-disable-next-line react/no-danger
      {...(isFirstLoad || videoCanPlay ? dangerouslySetInnerHTMLProps : {})}
      style={{
        ...(!(isFirstLoad || videoCanPlay) ? { padding: '100% 100% 0 0' } : {}),
      }}
    />
  );
};

const Video = styled(MutableVideo)`
  ${css('fallbackColor', 'background-color')}

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
