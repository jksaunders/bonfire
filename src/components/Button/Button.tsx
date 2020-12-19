import React, { FC } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props): string => props.color};
`;

interface ButtonProps {
  color: string;
  children?: never;
}

const Button: FC<ButtonProps> = ({ color = 'red' }) => (
  <StyledButton color={color}>test button</StyledButton>
);

export default Button;
