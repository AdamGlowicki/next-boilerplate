import React from 'react';

import { TableCell } from '@/features/Character/components/CharactersTable';

const TableHeader = () => (
  <>
    <TableCell isHeader>Name</TableCell>
    <TableCell isHeader>Status</TableCell>
    <TableCell isHeader>Species</TableCell>
    <TableCell isHeader>Gender</TableCell>
  </>
);

export { TableHeader };
