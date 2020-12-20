import React, { FC, useState } from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: ${(props): string => props.color};
`;

export const Button: FC<{
  color: string;
  children?: never;
}> = ({ color = 'red' }) => {
  const [value] = useState(color);

  return <StyledButton color={color}>test button</StyledButton>;
};
