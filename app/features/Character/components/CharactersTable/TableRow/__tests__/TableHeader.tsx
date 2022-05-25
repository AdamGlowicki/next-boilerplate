import {
  render,
} from '@testing-library/react';

import { TableHeader } from '@/features/Character/components/CharactersTable/TableRow';

describe('Table header', () => {
  it('should render component', () => {
    const { getByText } = render(<TableHeader />);

    expect(getByText('Name')).toBeInTheDocument();
  });
});
