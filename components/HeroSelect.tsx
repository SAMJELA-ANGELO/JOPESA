'use client';

import type { CSSProperties } from 'react';

export interface HeroSelectOption {
  value: string;
  label: string;
}

interface HeroSelectProps {
  value: string;
  options: HeroSelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export default function HeroSelect({
  value,
  options,
  onChange,
  placeholder,
  ariaLabel,
  isRequired,
  isDisabled,
  className,
  style,
}: HeroSelectProps) {
  return (
    <select
      aria-label={ariaLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      required={isRequired}
      disabled={isDisabled}
      className={className}
      style={style}
    >
      {placeholder && !options.some((option) => option.value === '') && (
        <option value="" disabled>{placeholder}</option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );
}