import React, { FunctionComponent } from 'react';
import { FormProvider } from 'react-hook-form';

import { TextField } from '@/core/components/TextField';
import { Button } from '@/core/components/Button';

import {
  ButtonsWrapper,
  CenterWrapper,
  StyledForm,
} from '@/features/Search/components/Search.style';
import {
  useHandleRandom,
  useHandleSearch,
} from '@/features/Search/components/hook';
import CharactersTable from '@/features/Character/components/CharactersTable/CharactersTable';

const Search: FunctionComponent = () => {
  const {
    handleSubmit,
    methods,
    onSubmit,
  } = useHandleSearch();

  const { handleRandom } = useHandleRandom();

  return (
    <>
      <CenterWrapper>
        <FormProvider {...methods}>
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <TextField
              name="search"
              type="text"
            />
            <ButtonsWrapper>
              <Button type="submit">Submit</Button>
              <Button
                variant="secondary"
                type="button"
                onClick={handleRandom}
              >
                Random
              </Button>
            </ButtonsWrapper>
          </StyledForm>
        </FormProvider>
      </CenterWrapper>

      <CharactersTable />
    </>
  );
};

export { Search };
