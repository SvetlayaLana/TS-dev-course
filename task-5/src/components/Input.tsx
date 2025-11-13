import type { HTMLProps } from 'react';
import cn from 'classnames';

type Props = HTMLProps<HTMLInputElement> & {
  error?: string;
};

export const Input = ({ error, label, placeholder = 'Enter data...', ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col gap-1">
        <span className="font-semibold text-sm">{label}</span>
        <input
          placeholder={placeholder}
          className={cn('p-2 border outline-none rounded-lg placeholder:text-gray-400', {
            'border-red-800': error,
            'border-gray-200': !error,
          })}
          {...props}
        />
      </label>
      {!!error && <p className="text-xs text-red-800">{error}</p>}
    </div>
  );
};
