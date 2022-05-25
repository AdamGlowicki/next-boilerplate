import { useDispatch } from 'react-redux';
import { useCallback } from 'react';

import { fetchRandomCharacters } from '@/features/Character/store/actions/character';

const randomNumber = (min: number, max: number): number => (
  Math.floor(Math.random() * (max - min + 1) + min)
);

const useHandleRandom = () => {
  const dispatch = useDispatch();

  const randomArray = useCallback(() => [
    randomNumber(1, 100).toString(),
    randomNumber(1, 100).toString(),
    randomNumber(1, 100).toString(),
  ], []);

  const getRandomCharacters = useCallback(async () => {
    dispatch(fetchRandomCharacters(randomArray()));
  }, [
    dispatch,
    randomArray,
  ]);

  const handleRandom = useCallback(async () => {
    await getRandomCharacters();
  }, [getRandomCharacters]);

  return { handleRandom };
};

export { useHandleRandom };
