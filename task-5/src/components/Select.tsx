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
        <span className="font-semibold text-sm">{label}</span>
        <select
          className={cn('p-2 border outline-none rounded-lg', {
            'border-red-800': error,
            'border-gray-200': !error,
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
      {!!error && <p className="text-xs text-red-800">{error}</p>}
    </div>
  );
};
