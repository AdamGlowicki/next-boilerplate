import React from 'react';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  FormattedMessage,
  useIntl,
} from 'react-intl';

import { TextField } from '@/core/components/TextField';
import { Button } from '@/core/components/Button';
import { FormRow } from '@/core/components/FormRow.styles';

import { Form } from './LoginForm.styles';
import messages from './LoginForm.messages';

const schema = yup.object().shape({
  email: yup.string().email()
    .required(),
  password: yup.string().min(3)
    .max(8)
    .required(),
});

export type FormDataType = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSubmit: (FormData: FormDataType) => unknown;
};

export const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const { formatMessage } = useIntl();
  const formMethods = useForm<FormDataType>({
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
  } = formMethods;

  return (
    <FormProvider {...formMethods}>
      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          name="email"
          type="email"
          placeholder={formatMessage(messages.email)}
        />
        <TextField
          name="password"
          type="password"
          placeholder={formatMessage(messages.password)}
        />
        <FormRow>
          <Button type="submit">
            <FormattedMessage {...messages.submit} />
          </Button>
        </FormRow>
      </Form>
    </FormProvider>
  );
};
