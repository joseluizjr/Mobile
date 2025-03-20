import { CiUser } from 'react-icons/ci';
import { IoIosArrowDown } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/context/auth';

export function SingOutButton() {
  const { user } = useAuth();

  return (
    <div className="flex gap-2">
      <div className="w-10 h-10 flex justify-center items-center bg-med-gray-25 rounded-xl p-0">
        <CiUser className="fill-med-gray-75 hover:fill-med-gray-75 w-5 h-5" />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex justify-center items-center gap-2 !bg-transparent cursor-pointer p-0 whitespace-nowrap">
            <p className="text-base text-med-gray-75 whitespace-nowrap">{user?.name}</p>
            <IoIosArrowDown size={14} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-2">
          <Button variant="link" onClick={() => {}}>
            Sair
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
