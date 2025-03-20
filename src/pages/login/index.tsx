import { useForm } from 'react-hook-form';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loading } from '@/components/ui/loading';
import { useAuthentication } from '@/hooks/login/useAuthentication';

import { resolverForm, SingInFormData } from './validateForm';

export function Login() {
  const { handleSingin, isLoading } = useAuthentication();

  const form = useForm<SingInFormData>({
    resolver: resolverForm,
    defaultValues: {
      username: '',
      password: '',
    },
  });

  function onSubmit({ username, password }: SingInFormData) {
    handleSingin({ username, password });
  }

  return (
    <div className="flex items-center justify-center h-full p-4">
      <div className="bg-white p-10 w-full md:w-1/4 shadow rounded-xl flex flex-col items-center">
        <img src={logo} alt="Logotipo Med Health System" className="w-[311px] mb-[40px]" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-6">
          <Input
            className="bg-med-gray-25 rounded-lg h-[47px]"
            placeholder="E-mail"
            type="text"
            {...form.register('username')}
          />
          <div className="flex flex-col gap-2">
            <Input
              className="bg-med-gray-25 rounded-lg h-[47px]"
              placeholder="Senha"
              type="password"
              {...form.register('password')}
            />
            <Button variant="link" className="text-med-green underline w-1/3">
              Esqueceu a senha?
            </Button>
          </div>
          <Button
            type="submit"
            className="bg-med-green text-white w-full h-[47px] hover:bg-med-green hover:opacity-85 text-xl font-normal"
          >
            {isLoading ? <Loading type="WHITE" /> : 'ENTRAR'}
          </Button>
        </form>
      </div>
    </div>
  );
}
