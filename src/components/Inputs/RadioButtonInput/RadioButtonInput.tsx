import { classNames } from '@/utils';
import { forwardRef, type InputHTMLAttributes } from 'react';
import { baseStyles } from './styles';

type RadioInputProps = Omit<
  React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'type' | 'ref'
>;

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>((props, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      aria-label={props['aria-label'] ?? 'radio'}
      type="radio"
      className={classNames(baseStyles, props.className)}
    />
  );
});

RadioInput.displayName = 'RadioInput';
export default RadioInput;
