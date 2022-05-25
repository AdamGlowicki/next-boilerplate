import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  border: 1px solid #d2d2d2;
  border-radius: ${({ theme: { formField } }) => formField.borderRadius};
  padding: 10px 15px;
`;

export const FieldErrorMessage = styled.div`
  padding-left: 5px;
  color: ${({ theme: { errorColor } }) => errorColor};
  font-size: 13px;
`;
