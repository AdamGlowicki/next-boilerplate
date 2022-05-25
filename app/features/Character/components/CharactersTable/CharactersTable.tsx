import React from 'react';
import { useSelector } from 'react-redux';

import {
  TableHeader,
  TableRow,
} from '@/features/Character/components/CharactersTable/TableRow';
import { selectCharacters } from '@/features/Character/store/selectors/character';

import {
  Header,
  Table,
} from './CharactersTable.style';

const CharactersTable = () => {
  const characters = useSelector(selectCharacters);

  return (
    <>
      <Header>Search Results:</Header>
      <Table>
        <TableHeader />

        {characters?.map(({
          name,
          id,
          gender,
          species,
          status,
        }) => (
          <TableRow
            gender={gender}
            species={species}
            name={name}
            status={status}
            id={id}
            key={id}
          />
        ))}
      </Table>
    </>
  );
};

export default CharactersTable;
