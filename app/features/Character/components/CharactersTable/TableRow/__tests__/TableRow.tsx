import {
  render,
} from '@testing-library/react';

import {
  TableRow,
  TableRowProps,
} from '@/features/Character/components/CharactersTable/TableRow';

const tableRow = {
  gender: 'Gender',
  id: 1,
  name: 'Name',
  species: 'Species',
  status: 'Status',
} as TableRowProps;

describe('Table row', () => {
  it('should render table row', () => {
    const { getByText } = render(<TableRow {...tableRow} />);

    expect(getByText(tableRow.gender)).toBeInTheDocument();
  });

  it('should display correct names', () => {
    const { getByText } = render(<TableRow {...tableRow} />);

    Object.entries(tableRow).forEach(([
      key,
      item,
    ]) => {
      if (key === 'id') return;
      expect(getByText(item)).toBeTruthy();
    });
  });

  it('should set correct link', () => {
    const { getByText } = render(<TableRow {...tableRow} />);

    expect(getByText(tableRow.name).closest('a')).toHaveAttribute('href', `/character/${tableRow.id}`);
  });
});
