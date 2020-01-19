import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography, { MaterialVariants } from '../Typography';
import * as colors from '../../theming/colors';

const propTypes = {
  bodyText: PropTypes.string.isRequired,
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  maxHeight: PropTypes.string,
  maxWidth: PropTypes.string,
  name: PropTypes.string.isRequired,
};

const defaultProps = {
  className: null,
  maxHeight: null,
  maxWidth: null,
};

const CardWrapper = styled.div`
  background-color: white;
  border-color: ${colors.cotton};
  border-style: solid;
  border-width: 1px;
  display: inline-block;
  ${props => props.maxHeight && `max-height: ${props.maxHeight};`}
  ${props => props.maxWidth && `max-width: ${props.maxWidth};`}
  padding: 32px;
`;

const RoundImage = styled.img`
  border-radius: 50%;
  ${props => props.maxHeight && `max-height: ${props.maxHeight};`}
  margin-bottom: 16px;
  object-fit: cover;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CenteredText = styled.div`
  display: flex;
  justify-content: center;
`;

const UserCard = ({
  bodyText,
  className,
  image,
  maxHeight,
  maxWidth,
  name,
}) => (
  <CardWrapper className={className} maxHeight={maxHeight} maxWidth={maxWidth}>
    <CardContainer>
      <RoundImage maxHeight={maxWidth} src={image} />
      <CenteredText>
        <Typography variant={MaterialVariants.H5}>{name}</Typography>
      </CenteredText>
      <CenteredText>
        <Typography center variant={MaterialVariants.Body1}>
          {bodyText}
        </Typography>
      </CenteredText>
    </CardContainer>
  </CardWrapper>
);

UserCard.propTypes = propTypes;
UserCard.defaultProps = defaultProps;
// UserCard.CONSTANTS = CONSTANTS;

export default UserCard;
