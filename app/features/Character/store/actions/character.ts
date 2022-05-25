import { createAsyncThunk } from '@reduxjs/toolkit';

import { characterApi } from '@/api/api';

const fetchCharactersByName = createAsyncThunk(
  'characters/fetchCharacters',
  async (query: string | undefined) => {
    const { data: { results } } = await characterApi.searchCharacters(query);

    return results;
  }
);

const fetchRandomCharacters = createAsyncThunk(
  'characters/fetchRandomCharacters',
  async (ids: Array<string>) => {
    const { data } = await characterApi.fetchMultipleCharacters(ids);

    return data;
  }
);

export {
  fetchCharactersByName,
  fetchRandomCharacters,
};
