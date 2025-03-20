interface ILoadingProps {
  type?: 'WHITE' | 'DEFAULT';
}

export function Loading({ type = 'DEFAULT' }: ILoadingProps) {
  return (
    <div data-testid="loading" className="flex items-center justify-center">
      <div
        className={`${type === 'WHITE' ? 'border-white' : 'border-blue-300'} animate-spin h-5 w-5 border-2 rounded-full`}
      />
    </div>
  );
}
