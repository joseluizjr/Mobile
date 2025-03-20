import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { afterEach } from 'vitest';

afterEach(() => {
  cleanup();
});

interface ProvidersType {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersType) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

function customRender(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: Providers, ...options });
}

export * from '@testing-library/react';

export { default as userEvent } from '@testing-library/user-event';

export { default as selectEvent } from 'react-select-event';

export { customRender as render };
