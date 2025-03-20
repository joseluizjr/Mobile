import { MdOutlineErrorOutline } from 'react-icons/md';

interface ErrorTemplateProps {
  sizeIcon?: number;
  title: string;
}

export function ErrorTemplate({ sizeIcon = 180, title }: ErrorTemplateProps) {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <MdOutlineErrorOutline size={sizeIcon} className="fill-gray-100" />
      <h2 className="text-2xl text-gray-100">{title}</h2>
      <p className="text-gray-100">Tente novamente mais tarde.</p>
    </div>
  );
}
