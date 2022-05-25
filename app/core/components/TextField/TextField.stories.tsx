import {
  Meta,
  Story,
} from '@storybook/react';
import {
  FormProvider,
  useForm,
} from 'react-hook-form';
import {
  ReactNode,
  useEffect,
} from 'react';

import { hideControls } from '@/utils/storybook';

import {
  TextField,
  TextFieldProps,
} from './TextField';

type StorybookTextFieldProps = TextFieldProps & {
  error?: {
    message: string;
    type: string;
  };
}

type StorybookFormProviderProps = StorybookTextFieldProps & {
  children: ReactNode;
}

export default {
  argTypes: {
    ...hideControls<StorybookTextFieldProps>([
      'error',
      'name',
      'ref',
    ]),
  },
  component: TextField,
  title: 'Components/TextField',
} as Meta;

const StorybookFormProvider = ({
  children,
  ...args
}: StorybookFormProviderProps) => {
  const methods = useForm();

  useEffect(() => {
    if (args.error) {
      methods.setError(args.name, args.error);
    }
  }, [
    args.error,
    args.name,
    methods,
  ]);

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  );
};

StorybookFormProvider.defaultProps = {
  error: null,
};

const Template: Story<StorybookTextFieldProps> = args => (
  <StorybookFormProvider {...args}>
    <TextField {...args} />
  </StorybookFormProvider>
);

export const Default = Template.bind({});
Default.args = {
  name: 'test',
  value: 'Test',
};

export const Error = Template.bind({});
Error.args = {
  error: {
    message: 'error message',
    type: 'manual',
  },
  name: 'test',
  value: 'Incorrect value',
};
