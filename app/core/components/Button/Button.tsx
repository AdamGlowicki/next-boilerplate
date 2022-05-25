import React from 'react';

import { MergeElementProps } from '@/core/interfaces/common';

import { StyledButton } from './Button.styles';

interface CustomProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

export type ButtonProps = MergeElementProps<
  'button',
  CustomProps
>

export const Button = ({
  type = 'button',
  children,
  onClick,
  variant = 'primary',
  ...props
}: ButtonProps) => (
  <StyledButton
    type={type}
    onClick={onClick}
    variant={variant}
    {...props}
  >
    { children }
  </StyledButton>
);
