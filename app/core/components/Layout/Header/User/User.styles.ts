import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: block;
  width: 100%;
`;

interface LoadingContainerProps {
  isLoading: boolean;
}

const LoadingStyles = css`
  top: -2rem;
  opacity: 0;
`;

export const LoadingContainer = styled.div<LoadingContainerProps>`
  position: relative;
  top: 0;
  opacity: 1;
  display: flex;
  padding: 1rem;
  background-color: #efefef;
  transition: all 0.2s ease-in;
  ${({ isLoading }) => (isLoading && LoadingStyles)}
`;

export const UserStatusTest = styled.span`
  flex: 1;
`;
