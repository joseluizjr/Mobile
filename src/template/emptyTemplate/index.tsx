import { ImFileEmpty } from 'react-icons/im';

interface EmptyProps {
  title: string;
  sizeIcon?: number;
}

export function EmptyTemplate({ title, sizeIcon = 100 }: EmptyProps) {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4">
      <ImFileEmpty size={sizeIcon} className="fill-gray-300" />
      <h2 className="text-2xl text-gray-400">{title}</h2>
    </div>
  );
}
