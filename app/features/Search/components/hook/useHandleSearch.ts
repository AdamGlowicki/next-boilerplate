import {
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { toggleLoader } from '@/features/Loader/store/slices/loader';
import { fetchCharactersByName } from '@/features/Character/store/actions/character';

type Inputs = {
  search?: string;
}

const useHandleSearch = () => {
  const dispatch = useDispatch();
  const methods = useForm();
  const { handleSubmit } = methods;

  const fetchCharacters = async (query: string | undefined) => {
    dispatch(toggleLoader(true));
    dispatch(fetchCharactersByName(query));
    dispatch(toggleLoader(false));
  };

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await fetchCharacters(data.search);
  };

  return {
    handleSubmit,
    methods,
    onSubmit,
  };
};

export { useHandleSearch };
