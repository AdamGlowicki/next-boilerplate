import styled from 'styled-components';

export const MenuNav = styled.nav`
  display: flex;
  justify-content: space-between;
`;

export const MenuList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const MenuItem = styled.li`
  margin: 4px;
  cursor: pointer;
`;

export const MenuLink = styled.a`
  display: block;
  padding: 16px;
  color: ${({ theme: { linkColor } }) => linkColor};
  text-decoration: none;
`;
