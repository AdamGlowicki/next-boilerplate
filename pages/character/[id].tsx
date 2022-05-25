import React, { FunctionComponent } from 'react';
import {
  GetServerSideProps,
} from 'next';

import { CharacterComponent } from '@/features/Character/components/SingleCharacter';
import { Character } from '@/features/Character/interfaces/common';

import { characterApi } from '@/api/api';

interface CharacterProps {
  isError: boolean;
  data: Character;
}

const CharacterItem: FunctionComponent<CharacterProps> = ({
  data,
  isError,
}) => {
  if (isError) {
    return <div>Opsss, something went wrong...</div>;
  }

  return (
    <CharacterComponent {...data} />
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const props: CharacterProps = {
    data: {
      gender: '',
      id: 0,
      image: '',
      name: '',
      species: '',
      status: '',
    },
    isError: false,
  };

  try {
    const { data } = await characterApi.fetchCharacter(params?.id);

    props.data = { ...data };
  } catch (e) {
    props.isError = true;
  }

  return ({
    props,
  });
};

export default CharacterItem;
