import React, { FC } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props: { color: string }): string => props.color};
`;

export interface ButtonProps {
  color: string;
  children?: never;
}

export const Button: FC<ButtonProps> = ({ color = 'red' }) => (
  <StyledButton color={color}>test button</StyledButton>
);
