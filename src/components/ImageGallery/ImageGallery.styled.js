import styled from '@emotion/styled';

export const ImageList = styled.ul`
  display: grid;
  max-width: calc(100% - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;
