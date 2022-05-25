import styled, { css } from 'styled-components';
import NextImage from 'next/image';

const CenterCharacter = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CharacterWrapper = styled.section`
  display: grid;
  grid-template-areas: 'image' 'description';
  width: 50%;
  height: auto;
  border: 1px solid #999;
`;

const Description = styled.div`
  grid-area: description;
  padding: 20px;
`;

const Image = styled(NextImage)`
  grid-area: image;
`;

const DescriptionLine = styled.div<{ isBold?: boolean }>`
  margin-bottom: 10px;
  font-size: 20px;
  ${({ isBold }) => (
    isBold && css`
      font-weight: bolder;
    `
  )}
`;

const BackIconWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  cursor: pointer;

  i {
    color: black;
    font-size: 100px;
  }
`;

export {
  BackIconWrapper,
  CenterCharacter,
  CharacterWrapper,
  Description,
  DescriptionLine,
  Image,
};
