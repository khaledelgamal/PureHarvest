import { classNames } from '@/utils';
import { forwardRef, useEffect, useRef, type InputHTMLAttributes } from 'react';
import { baseStyles } from './styles';
import mergeRefs from '@/utils/mergeRefs';

type CheckboxInputProps = Omit<
  React.DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'ref'
> & {
  indeterminate?: boolean;
};

const CheckboxInput = forwardRef<HTMLInputElement, CheckboxInputProps>(
  ({ indeterminate = false, ...props }, ref) => {
    const internalRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      const element = internalRef.current;
      if (element) {
        element.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    return (
      <input
        ref={mergeRefs(internalRef, ref)}
        aria-label={props['aria-label'] ?? 'checkbox'}
        type="checkbox"
        className={classNames(baseStyles, props.className)}
        {...props}
      />
    );
  },
);
export default CheckboxInput;
