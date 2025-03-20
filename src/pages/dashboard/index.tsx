import { useAuth } from '@/context/auth';

export function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="flex gap-2 mt-10">
          <p className="text-2xl text-gray-500">Olá, {user?.name}</p>
        </div>
        <span className="mt-4 text-gray-500">Selecione uma opção do menu para iniciar</span>
      </div>
    </div>
  );
}
