import React from 'react';
import { useSelector } from 'react-redux';

import {
  AnimatedLoader,
  LoaderWrapper,
} from '@/features/Loader/conponents/Loader.style';
import { loaderSelector } from '@/features/Loader/store/selectors/loader';

const Loader = () => {
  const isLoading = useSelector(loaderSelector);

  return isLoading ?
    (
      <LoaderWrapper>
        <div className="fa-3x">
          <AnimatedLoader />
        </div>
      </LoaderWrapper>
    ) :
    null;
};

export { Loader };
