import { classNames } from '@/utils';
import type { InputHTMLAttributes } from 'react';
import { baseStyles } from './styles';

type RadioInputProps = Omit<
  React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type'
>;

const RadioInput = (props: RadioInputProps) => {
  return (
    <input
      {...props}
      aria-label={props['aria-label'] ?? 'radio'}
      type="radio"
      className={classNames(baseStyles, props.className)}
    />
  );
};

export default RadioInput;
