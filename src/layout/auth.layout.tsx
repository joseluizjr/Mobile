import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="bg-[url(../assets/background.png)] bg-cover bg-center h-screen">
      <Outlet />
    </div>
  );
}
