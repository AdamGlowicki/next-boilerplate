import { Character } from '@/features/Character/interfaces/common';

import { request } from '@/utils/request';

interface Response<T> {
  data: T;
}

export const characterApi = {
  fetchCharacter: (id: string | Array<string> | undefined): Promise<Response<Character>> => request.get(`/character/${id}`),
  fetchMultipleCharacters: (ids: Array<string>): Promise<Response<Array<Character>>> => request.get(`/character/${ids}`),
  searchCharacters: (query: string | undefined): Promise<Response<{ results: Array<Character> }>> => request.get(`/character/?name=${query}`),
};

