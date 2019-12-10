import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { animated, useTransition } from 'react-spring';
import {
  HeaderButton,
  HeaderItem,
  HeaderLogo
} from './subcomponents';
import { BACKGROUND_SHAPE, getBackground } from '../../shapes';

const CONSTANTS = {
  VARIANT: {
    FULL: 'FULL',
    SIDE: 'SIDE'
  }
};

const padding = '16px';

const StyledBaseHeader = styled.div`
  align-items: center;
  ${props => getBackground(props.background)}
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  padding: ${padding};
  width: 100%;
`;

const FullHeader = styled(StyledBaseHeader)`
  height: ${({ height }) => height};
`;

const FloatingHeader = styled(StyledBaseHeader)`
  box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
  height: 75px;
  left: 0px;
  position: fixed;
`;

const AnimatedFloatingHeader = animated(FloatingHeader);

const propTypes = {
  background: BACKGROUND_SHAPE,
  buttons: PropTypes.arrayOf(PropTypes.shape(HeaderButton.shape)),
  logo: PropTypes.shape(HeaderLogo.shape),
  items: PropTypes.arrayOf(PropTypes.shape(HeaderItem.shape)),
  height: PropTypes.string,
  variant: PropTypes.oneOf(Object.keys(CONSTANTS.VARIANT)),
  showFloatingHeader: PropTypes.bool
};

const defaultProps = {
  background: null,
  buttons: [],
  logo: null,
  items: [],
  height: '125px',
  variant: CONSTANTS.VARIANT.FULL,
  showFloatingHeader: false
};

const Header = ({
  buttons,
  logo,
  items,
  height,
  variant,
  showFloatingHeader,
  ...rest
}) => {
  const transitions = useTransition(showFloatingHeader, null, {
    from: { top: '-100px' },
    enter: { top: '0px' },
    leave: { top: '-100px' },
  });

  const renderChildren = () => (
    <>
      {logo && <Header.HeaderLogo {...logo} />}
      {items.map((item, index) => (
        <Header.HeaderItem key={index} {...item} />
      ))}
      {buttons.map((button, index) => (
        <Header.HeaderButton key={index} {...button} />
      ))}
    </>
  );

  return (
    <>
      <FullHeader height={height} {...rest}>
        {renderChildren()}
      </FullHeader>
      {variant === CONSTANTS.VARIANT.FULL
        && transitions.map(({ item, key, props: transitionProps }) => item && (
          <AnimatedFloatingHeader key={key} {...rest} style={{ top: transitionProps.top }}>
            {renderChildren()}
          </AnimatedFloatingHeader>
        ))}
    </>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
Header.CONSTANTS = CONSTANTS;
Header.HeaderButton = HeaderButton;
Header.HeaderItem = HeaderItem;
Header.HeaderLogo = HeaderLogo;

export default Header;