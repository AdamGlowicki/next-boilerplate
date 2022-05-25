import React, { FunctionComponent } from 'react';
import Link from 'next/link';

import { TableCell } from '@/features/Character/components/CharactersTable';

export interface TableRowProps {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
}

const TableRow: FunctionComponent<TableRowProps> = ({
  gender,
  species,
  status,
  name,
  id,
}) => (
  <>
    <TableCell><Link href={`/character/${id}`}>{ name }</Link></TableCell>
    <TableCell>{ status }</TableCell>
    <TableCell>{ species }</TableCell>
    <TableCell>{ gender }</TableCell>
  </>
);

export {
  TableRow,
};
