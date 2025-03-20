import './styles/global.css';

import { Toaster } from '@/components/ui/toaster';

import { GlobalProvider } from './context';
import { QueryProvider } from './libs/react-query';
import { Router } from './routes';

export function App() {
  return (
    <QueryProvider>
      <GlobalProvider>
        <Router />
        <Toaster />
      </GlobalProvider>
    </QueryProvider>
  );
}
