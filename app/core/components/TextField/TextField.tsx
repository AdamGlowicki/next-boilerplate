import React from 'react';
import { useFormContext } from 'react-hook-form';

import { FormRow } from '@/core/components/FormRow.styles';
import { MergeElementProps } from '@/core/interfaces/common';

import {
  FieldErrorMessage,
  Input,
} from './TextField.styles';

export type TextFieldProps = MergeElementProps<
  'input', {
    name: string;
  }
>

export const TextField = ({
  name,
  type,
  placeholder,
  ...props
}: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormRow>
      <Input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        {...props}
      />
      {errors[name]?.message && (
        <FieldErrorMessage>
          {errors[name].message}
        </FieldErrorMessage>
      )}
    </FormRow>
  );
};
