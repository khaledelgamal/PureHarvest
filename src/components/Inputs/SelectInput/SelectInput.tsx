import { forwardRef } from 'react';
import { classNames } from '@/utils';
import type { FieldError } from 'react-hook-form';

interface SelectInputProps extends React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> {
  options: { label: string; value: string }[];
  placeholder?: string;
  error?: FieldError;
}

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ options, placeholder, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-[6px]">
        <select
          {...props}
          ref={ref}
          className={classNames(
            'w-full border border-gray-100 rounded-md px-4 py-[14px]',
            'text-gray-900 focus:border-primary focus:outline-none',
            'appearance-none bg-white cursor-pointer transition-colors duration-300',
            error ? 'border-danger focus:border-danger' : '',
            className,
          )}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="font-medium text-sm text-danger">{error.message}</p>}
      </div>
    );
  },
);

SelectInput.displayName = 'SelectInput';
export default SelectInput;
