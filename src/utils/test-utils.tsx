import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';

type ProvidersProps = {
  children: ReactNode;
};

function AllTheProviders(props: ProvidersProps) {
  const { children } = props;

  return <>{children}</>;
}

const renderWithHookForm = (ui: ReactElement, { defaultValues = {} } = {}) => {
  const Wrapper = ({ children }: { children: ReactElement }) => {
    const methods = useForm({ defaultValues });
    return (
      <AllTheProviders>
        <FormProvider {...methods}>{children}</FormProvider>
      </AllTheProviders>
    );
  };

  return { ...render(ui, { wrapper: Wrapper }) };
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
export { renderWithHookForm };
