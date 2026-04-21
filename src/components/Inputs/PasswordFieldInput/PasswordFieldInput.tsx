// components/PasswordFieldInput/PasswordFieldInput.tsx
import { forwardRef, useState } from 'react';
import type { FieldError } from 'react-hook-form';
import { classNames } from '@/utils';
import {
  baseStyles,
  containerStyles,
  inputWrapperStyles,
  inputFullWidthStyles,
  inputWithIconStyles,
  inputErrorStyles,
  inputWarnStyles,
  errorIconStyles,
  warnIconStyles,
  errorMessageStyles,
  warnMessageStyles,
} from '../TextFieldInput/styles';
import { WarnIcon } from '@/icons/WarnIcon';
import AlertTriangleIcon from '@/icons/AlertTriangleIcon';
import EyeIcon from '@/icons/EyeIcon';
import EyeOffIcon from '@/icons/EyeOffIcon';

interface PasswordFieldInputProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  error?: FieldError;
  warn?: string;
}

const PasswordFieldInput = forwardRef<HTMLInputElement, PasswordFieldInputProps>((props, ref) => {
  const { error, warn, className, ...restProps } = props;
  const [visible, setVisible] = useState(false);

  const hasStatusIcon = !!error || !!warn;

  return (
    <div className={containerStyles}>
      <div className={inputWrapperStyles}>
        <input
          {...restProps}
          ref={ref}
          type={visible ? 'text' : 'password'}
          className={classNames(
            baseStyles,
            inputFullWidthStyles,
            'pr-10',
            hasStatusIcon ? inputWithIconStyles : '',
            error ? inputErrorStyles : warn ? inputWarnStyles : '',
            className,
          )}
        />

        {/* Toggle visibility button */}
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
          tabIndex={-1}
        >
          {visible ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button>

        {/* Error / Warn icons (shifted left so they don't overlap the eye) */}
        {error ? (
          <AlertTriangleIcon className={classNames(errorIconStyles, 'right-10')} />
        ) : warn ? (
          <WarnIcon className={classNames(warnIconStyles, 'right-10')} />
        ) : null}
      </div>

      {error ? (
        <p className={errorMessageStyles}>{error.message}</p>
      ) : warn ? (
        <p className={warnMessageStyles}>{warn}</p>
      ) : null}
    </div>
  );
});

PasswordFieldInput.displayName = 'PasswordFieldInput';

export default PasswordFieldInput;
