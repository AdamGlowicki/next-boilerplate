import {
  Action,
  combineReducers,
  Reducer,
} from 'redux';
import reduceReducers from 'reduce-reducers';

import { configReducer } from '@/core/store/reducers/config';
import { hydrateReducer } from '@/core/store/reducers/hydrate';
import { RootState } from '@/core/interfaces/store';

import character from '@/features/Character/store/slices/character';
import loader from '@/features/Loader/store/slices/loader';
import auth from '@/features/Auth/store/slices/auth';

const featuresReducer = combineReducers({
  auth,
  characters: character,
  config: configReducer,
  loader,
});

export const rootReducer = reduceReducers<RootState>(
  hydrateReducer,
  featuresReducer
) as Reducer<RootState, Action>;

