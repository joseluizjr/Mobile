/* eslint-disable no-useless-escape */
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';

import { MenuItem } from './const';

interface NavLinkProps {
  item: MenuItem;
  openMenu: boolean;
}

export function NavLink({ item, openMenu }: NavLinkProps) {
  const subMenuRef = useRef<HTMLDivElement>(null);
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isCurrentRoute = item.activeRoutes ? item.activeRoutes.includes(pathname.replace(/\/[a-f0-9\-]+$/, '')) : false;

  function handleNavigation(link?: string) {
    if (!link) return;
    navigate(link);
  }

  function handleOpenSubMenu(event: React.MouseEvent) {
    event.stopPropagation();
    setOpenSubMenu((prev) => !prev);
  }

  function handleDropdown(event: React.MouseEvent, name: string) {
    event.stopPropagation();
    setDropdownOpen((prev) => (prev === name ? null : name));
  }

  const liClasses = clsx('flex flex-col', openMenu ? 'gap-4' : 'items-center justify-center');

  const itemListClass = clsx(
    'cursor-pointer flex items-center gap-2 text-gray-500 stroke-gray-500 fill-gray-500 hover:stroke-green-400 hover:text-green-400 hover:fill-green-400 data-[current=true]:stroke-blue-400 data-[current=true]:text-blue-400 data-[current=true]:fill-blue-400',
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
        setOpenSubMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <li
      title={item.name}
      data-current={isCurrentRoute}
      className={liClasses}
      onClick={(e) => (!item.isSubmenu ? handleNavigation(item.link) : handleOpenSubMenu(e))}
      aria-current={isCurrentRoute ? 'page' : undefined}
    >
      <div className={itemListClass}>
        {item.Icon && <item.Icon size={17} />}
        {openMenu && <p>{item.name}</p>}
      </div>

      {openSubMenu && (
        <div
          ref={subMenuRef}
          className="absolute h-[calc(100vh-70px)] bg-white top-[70px] left-[185px] w-[250px] shadow-lg p-4 z-10"
        >
          {item.isSubmenu && (
            <>
              <div className="flex items-center justify-between">
                <p className="text-lg text-med-gray-75">{item.name}</p>
                <IoMdClose onClick={(e) => handleOpenSubMenu(e)} className="cursor-pointer fill-med-gray-75" />
              </div>
              <hr className="my-2" />
              <div className="flex flex-col gap-2">
                {item.submenuItems?.map((subItem, index) => (
                  <div key={`submenu-${index}`}>
                    {!subItem.isSubmenu && (
                      <p onClick={() => handleNavigation(subItem.link)} className={itemListClass}>
                        {subItem.name}
                      </p>
                    )}
                    {subItem.submenuItems?.length && (
                      <div>
                        <div
                          className="flex items-center justify-between"
                          onClick={(e) => handleDropdown(e, subItem.name)}
                        >
                          <p className={itemListClass}>{subItem.name}</p>
                          {dropdownOpen === subItem.name ? (
                            <IoIosArrowUp className="fill-med-gray-75" />
                          ) : (
                            <IoIosArrowDown className="fill-med-gray-75" />
                          )}
                        </div>
                        {dropdownOpen === subItem.name && (
                          <div className="ml-2 py-2 flex flex-col gap-2">
                            {subItem.submenuItems.map((child, childIndex) => (
                              <p
                                key={`child-${childIndex}`}
                                className={itemListClass}
                                onClick={() => handleNavigation(child.link)}
                              >
                                {child.name}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </li>
  );
}
