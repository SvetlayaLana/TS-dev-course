import type { FC, HTMLProps } from 'react';
import cn from 'classnames';

type Props = HTMLProps<HTMLSelectElement> & {
  options: { value: string; label: string }[];
  error?: string;
};

export const Select: FC<Props> = ({ error, label, options, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="flex flex-col gap-1">
        <span className="font-semibold">{label}</span>
        <select
          className={cn('p-2 border-2 outline-none rounded-xl h-11', {
            'border-red-800': error,
            'border-gray-400 hover:border-fuchsia-800 focus:border-fuchsia-700': !error,
          })}
          {...props}
        >
          <option key="default" value="">
            Choose value...
          </option>
          {options.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>
      {!!error && <p className="text-xs font-semibold text-red-800">{error}</p>}
    </div>
  );
};
