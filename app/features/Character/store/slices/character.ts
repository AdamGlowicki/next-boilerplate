import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { Character } from '@/features/Character/interfaces/common';

import {
  fetchCharactersByName,
  fetchRandomCharacters,
} from '../actions/character';

export interface CharacterState {
  characters: Array<Character>;
  isError: boolean;
}

const initialState: CharacterState = {
  characters: [],
  isError: false,
};

const charactersSlice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(
        fetchCharactersByName.fulfilled, (state, { payload }: PayloadAction<Array<Character>>) => {
          state.characters = payload;
        }
      )
      .addCase(
        fetchRandomCharacters.fulfilled, (state, { payload }: PayloadAction<Array<Character>>) => {
          state.characters = payload;
        }
      );
  },
  initialState,
  name: 'characters',
  reducers: {
    toggleError: (state, { payload }: PayloadAction<boolean>) => {
      state.isError = payload;
    },
  },
});

export default charactersSlice.reducer;

export const {
  toggleError,
} = charactersSlice.actions;
