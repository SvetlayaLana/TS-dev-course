import type { FC, HTMLProps } from 'react';
import cn from 'classnames';

type Props = HTMLProps<HTMLInputElement> & {
  error?: string;
};

export const Input: FC<Props> = ({
  error,
  label,
  placeholder = 'Enter data...',
  className,
  ...props
}) => {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <label className="flex flex-col gap-1">
        <span className="font-semibold">{label}</span>
        <input
          placeholder={placeholder}
          className={cn('p-2 border-2 outline-none rounded-xl placeholder:text-gray-500 h-11', {
            'border-red-800': error,
            'border-gray-400 hover:border-fuchsia-800 focus:border-fuchsia-700': !error,
          })}
          {...props}
        />
      </label>
      {!!error && <p className="text-xs font-semibold text-red-800">{error}</p>}
    </div>
  );
};
