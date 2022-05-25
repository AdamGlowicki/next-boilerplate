import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';

import {
  BackIconWrapper,
  CenterCharacter,
  CharacterWrapper,
  Description,
  DescriptionLine,
  Image,
} from '@/features/Character/components/SingleCharacter/Character.style';
import { Character } from '@/features/Character/interfaces/common';

const CharacterComponent: FunctionComponent<Character> = ({
  id,
  name,
  species,
  status,
  gender,
  image,
}) => {
  const { back } = useRouter();

  return (
    <CenterCharacter>
      <CharacterWrapper>
        <Image
          src={image}
          width="100%"
          height="100%"
          layout="responsive"
        />

        <Description>
          <DescriptionLine isBold>{name}</DescriptionLine>
          <DescriptionLine>{id}</DescriptionLine>
          <DescriptionLine>{species}</DescriptionLine>
          <DescriptionLine>{status}</DescriptionLine>
          <DescriptionLine>{gender}</DescriptionLine>
        </Description>
      </CharacterWrapper>

      <BackIconWrapper onClick={back}>
        <i className="fa-solid fa-hand-point-left" />
      </BackIconWrapper>
    </CenterCharacter>
  );
};

export { CharacterComponent };
