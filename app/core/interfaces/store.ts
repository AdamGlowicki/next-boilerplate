import { AppThunkDispatch } from '@/core/store/store';
import { ConfigState } from '@/core/interfaces/state';

import { CharacterState } from '@/features/Character/store/slices/character';
import { LoaderState } from '@/features/Loader/store/slices/loader';
import { AuthState } from '@/features/Auth/interfaces';

export interface RootState {
  config: ConfigState;
  auth: AuthState;
  characters: CharacterState;
  loader: LoaderState;
}

export type FeatureNames = keyof RootState;

export type ValidationError<T = undefined> = T | unknown;

export interface ThunkHandlers {
  dispatch: AppThunkDispatch;
  rejectValue: ValidationError;
}
