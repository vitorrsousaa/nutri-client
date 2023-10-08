import { ReactElement, ReactNode } from 'react';
import { render, RenderOptions } from '@testing-library/react';

interface ProvidersProps {
  children: ReactNode;
}

function AllTheProviders(props: ProvidersProps) {
  const { children } = props;
  return <>{children}</>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
