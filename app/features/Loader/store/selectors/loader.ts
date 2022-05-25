import { RootState } from '@/core/interfaces/store';

const loaderSelector = (state: RootState) => state.loader.isLoading;

export { loaderSelector };
