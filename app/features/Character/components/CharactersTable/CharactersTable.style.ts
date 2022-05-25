import styled, { css } from 'styled-components';

interface TableCellInterface {
  isHeader?: boolean;
}

const Header = styled.h1`
  margin: 20px 0 10px;
`;

const Table = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  width: 100%;
  border: 1px solid #999;
`;

const TableCell = styled.div<TableCellInterface>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  padding-left: 12px;
  font-size: 16px;
  ${({ isHeader }) => (
    isHeader && css`
      background-color: #999;
    `
  )}
`;

export {
  Header,
  Table,
  TableCell,
};
