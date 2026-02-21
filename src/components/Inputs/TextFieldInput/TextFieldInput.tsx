import { classNames } from '@/utils';
import { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
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
} from './styles';
import { WarnIcon } from '@/icons/WarnIcon';
import AlertTriangleIcon from '@/icons/AlertTriangleIcon';

interface TextFieldInputProps extends React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> {
  error?: FieldError;
  warn?: string;
}

const TextFieldInput = forwardRef<HTMLInputElement, TextFieldInputProps>((props, ref) => {
  const { error, warn, className, ...restProps } = props;

  const hasIcon = !!error || !!warn;

  return (
    <div className={containerStyles}>
      <div className={inputWrapperStyles}>
        <input
          {...restProps}
          ref={ref}
          className={classNames(
            baseStyles,
            inputFullWidthStyles,
            hasIcon ? inputWithIconStyles : '',
            error ? inputErrorStyles : warn ? inputWarnStyles : '',
            className,
          )}
        />
        {error ? (
          <AlertTriangleIcon className={errorIconStyles} />
        ) : warn ? (
          <WarnIcon className={warnIconStyles} />
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

export default TextFieldInput;
