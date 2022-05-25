import { RootState } from '@/core/interfaces/store';

const selectCharacters = (state: RootState) => state.characters.characters;

export {
  selectCharacters,
};
