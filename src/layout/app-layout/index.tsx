import { useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import { Outlet, useNavigate } from 'react-router-dom';

import logo from '@/assets/logo.svg';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/routes/const';
import { clearStorage } from '@/utils/clearCache';

import { MENU, MenuItem } from './const';
import { NavLink } from './nav-link';
import { SingOutButton } from './singOutButton';

export function AppLayout() {
  const navigate = useNavigate();
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);

  function handleMobileClick(link: string) {
    setOpenMobileMenu(false);
    navigate(link);
  }

  function handleLogout() {
    clearStorage();
    navigate(ROUTES.INITIAL);
  }

  return (
    <div className="relative">
      <header className="w-full flex justify-between gap-4 md:gap-0 items-center py-4 border bg-white shadow h-[70px] sticky top-0 z-10">
        <div className="flex items-center justify-start gap-0">
          <div className="w-full md:min-w-[185px] px-4">
            <img
              className="cursor-pointer h-10 hidden md:block"
              src={logo}
              onClick={() => navigate(ROUTES.WELCOME_PAGE)}
              alt="Antena de transmissão na cor verde"
            />
            {openMobileMenu ? (
              <IoMdClose
                size={50}
                className="block md:hidden w-full fill-gray-500 ml-auto p-2"
                onClick={() => setOpenMobileMenu(false)}
              />
            ) : (
              <IoMdMenu
                size={40}
                className="block md:hidden w-full fill-gray-500"
                onClick={() => setOpenMobileMenu(true)}
              />
            )}
          </div>
          <div className="bg-med-gray-25 w-full md:min-w-[390px] rounded-[8px] flex items-center py-2 px-2 cursor-pointer gap-2">
            <p className="bg-transparent text-med-gray-75">Pesquisar...</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-4 px-4">
          <SingOutButton />
        </div>
      </header>

      <main className="w-full h-[calc(100vh-70px)] p-0 flex">
        <div className="hidden md:flex flex-col justify-between transition-all p-4 bg-white h-full max-w-[185px] w-full pb-12">
          <ul className="mb-6 flex flex-col gap-6">
            {MENU.map((item: MenuItem) => (
              <NavLink key={item.id} item={item} openMenu={true} />
            ))}
          </ul>
          <div className="flex w-full items-center text-gray-500 absolute bottom-0 left-0 px-4">
            <div className="w-full flex items-center gap-2">
              <Button
                onClick={() => handleLogout()}
                className="!bg-transparent w-full flex items-center justify-start p-0 !rounded-none cursor-pointer text-gray-500 hover:text-red-400"
              >
                <BiLogOut size={17} /> <span className="text-base">Sair</span>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-med-gray-25 w-full h-full p-4">
          <div className="bg-white w-full h-full rounded p-4 shadow">
            <Outlet />
          </div>
        </div>
      </main>

      {openMobileMenu && (
        <div className="absolute left-0 top-10 flex md:hidden flex-col items-center w-full h-full bg-blue-300 bg-opacity-90">
          <img
            className="cursor-pointer w-[300px] my-10"
            src={logo}
            onClick={() => navigate(ROUTES.WELCOME_PAGE)}
            alt="Antena de transmissão na cor verde"
          />
          <ul className="flex flex-col gap-4 items-center justify-center">
            {MENU.map((item) => (
              <li
                onClick={() => handleMobileClick(item.link ?? '')}
                className="text-lg text-gray-500 underline underline-offset-2 cursor-pointer"
                key={item.id}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
