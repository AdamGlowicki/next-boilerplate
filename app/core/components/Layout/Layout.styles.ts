import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const PageHeader = styled.header`
  position: sticky;
  top: 0;
`;

export const ContentWrapper = styled.main`
  flex: auto;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 50px;
`;

export const PageFooter = styled.footer`
  padding: 0 20px;
  background: #5a5a5a;
  color: #fff;
`;
