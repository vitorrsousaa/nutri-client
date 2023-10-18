import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

interface FormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  children: React.ReactNode;
}

export function Form(props: FormProps) {
  const { children, ...formProps } = props;

  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form {...formProps}>{children}</form>
    </FormProvider>
  );
}
