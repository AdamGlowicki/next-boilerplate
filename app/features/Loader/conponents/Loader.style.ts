import styled from 'styled-components';

const LoaderWrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const AnimatedLoader = styled.i.attrs({
  className: 'fas fa-spinner fa-pulse',
})`
  font-size: 100px;
`;

export {
  AnimatedLoader,
  LoaderWrapper,
};
