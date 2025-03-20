import { ReactNode } from 'react';

import { AuthProvider } from './auth';

interface GlobalProviderProps {
  children: ReactNode;
}

export function GlobalProvider({ children }: GlobalProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
