import { InputHTMLAttributes } from 'react';
import { IoSearch } from 'react-icons/io5';

import { Input } from '@/components/ui/input';

type SearchInputProps = InputHTMLAttributes<HTMLInputElement>;

export function SearchInput(props: SearchInputProps) {
  return (
    <div className="flex gap-2 items-center w-full relative mb-4">
      <IoSearch className="absolute top-0 right-0 h-5 w-5 m-2" />
      <Input type="text" className="pr-10 h-10 rounded-lg bg-gray-200 text-black text-sm w-full" {...props} />
    </div>
  );
}
