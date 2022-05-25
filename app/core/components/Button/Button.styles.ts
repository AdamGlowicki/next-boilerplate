import styled, { css } from 'styled-components';

import { ButtonProps } from './Button';

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: ${({ theme: { formField } }) => formField.borderRadius};
  padding: 8px 16px;
  background-color: ${({ theme: { primaryColor } }) => primaryColor};
  color: #fff;
  cursor: pointer;
  ${({ variant }) => variant === 'secondary' && css`
    border: ${({ theme: { secondaryColor } }) => `1px solid ${secondaryColor}`};
    background-color: #fff;
    color: ${({ theme: { secondaryColor } }) => secondaryColor};
  `}
`;
