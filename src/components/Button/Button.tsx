import React, { FC } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props: { color: string }): string => props.color};
`;

export const Button: FC<{
  color: string;
  children?: never;
}> = ({ color = 'red' }) => (
  <StyledButton color={color}>test button</StyledButton>
);
