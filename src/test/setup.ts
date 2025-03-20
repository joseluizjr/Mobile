import '@testing-library/jest-dom';

import * as useToast from '@/hooks/use-toast';

export const navigate = vi.fn();
export const toastMock = vi.fn();

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

vi.spyOn(useToast, 'useToast').mockImplementation(() => ({
  toast: toastMock,
  dismiss: vi.fn(),
  toasts: [],
}));
