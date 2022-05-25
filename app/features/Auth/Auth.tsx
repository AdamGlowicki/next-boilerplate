import React from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';

import { useAppDispatch } from '@/core/store/store';

import { getUser } from '@/features/Auth/store';
import { AuthType } from '@/features/Auth/interfaces';
import {
  FormDataType,
  LoginForm,
} from '@/features/Auth/components/LoginForm';

export const Auth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (formData: FormDataType) => {
    try {
      const res = await signIn<AuthType.CREDENTIALS>(AuthType.CREDENTIALS, {
        ...formData,
        redirect: false,
      });

      await dispatch(getUser());

      if (res?.url) router.push(res.url);

      return res;
    } catch (error) {
      console.error(error);

      return null;
    }
  };

  return (
    <LoginForm onSubmit={onSubmit} />
  );
};
