import { render, screen } from '@/test/customRender';
import { describe, it, expect } from 'vitest';

import { Login } from '..';

const renderComponent = () => render(<Login />);
describe('Login', () => {
  it('should render correctly', () => {
    renderComponent();

    const inputEmail = screen.getByPlaceholderText(/e\-mail/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const forgetPasswordButton = screen.getByRole('button', {
      name: /esqueceu a senha\?/i,
    });
    const loginButton = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(forgetPasswordButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
