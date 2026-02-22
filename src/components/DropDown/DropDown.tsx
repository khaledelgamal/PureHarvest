import { useState, useRef, useEffect } from 'react';
import type { DropDownColors } from '../components.type';
import {
  triggerStyles,
  chevronStyles,
  menuStyles,
  menuOpenStyles,
  menuClosedStyles,
  optionStyles,
  optionActiveStyles,
  wrapperStyles,
} from './styles';
import { classNames } from '@/utils';
import ChevronIcon from '@/icons/ChevronIcon';

export type DropDownOption = {
  label: string;
  value: string;
};

type DropDownProps = {
  options: DropDownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  gap?: string;
  colors?: DropDownColors;
  className?: string;
};

const defaultColors: DropDownColors = {
  trigger: 'text-gray-900',
  option: 'text-gray-600',
  active: 'text-primary',
  bg: 'bg-white',
};

export const DropDown = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  gap = '1rem',
  colors = {},
  className,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.value === value);

  const {
    trigger = defaultColors.trigger,
    option = defaultColors.option,
    active = defaultColors.active,
    bg = defaultColors.bg,
  } = colors;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={wrapperStyles}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        style={{ gap }}
        className={classNames(triggerStyles, trigger, className)}
      >
        <span className="truncate">{selectedOption?.label ?? placeholder}</span>

        <ChevronIcon className={classNames(chevronStyles, isOpen ? 'rotate-0' : 'rotate-180')} />
      </button>

      <ul className={classNames(menuStyles, bg, isOpen ? menuOpenStyles : menuClosedStyles)}>
        {options.map(opt => (
          <li
            key={opt.value}
            onClick={() => handleSelect(opt.value)}
            className={classNames(
              optionStyles,
              opt.value === value ? classNames(optionActiveStyles, active) : option,
            )}
          >
            {opt.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
