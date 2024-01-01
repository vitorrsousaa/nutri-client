import { ReactElement, ReactNode, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { BrowserRouter } from 'react-router-dom';

type ProvidersProps = {
  children: ReactNode;
};

function AllTheProviders(props: ProvidersProps) {
  const { children } = props;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </BrowserRouter>
  );
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

function customRenderHook<Result, Props>(
  hook: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) {
  return renderHook(hook, { wrapper: AllTheProviders, ...options });
}

export * from '@testing-library/react';
export { customRender as render };
export { renderWithHookForm };
export { customRenderHook as renderHook };
