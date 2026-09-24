import * as React from 'react';
import { cx } from '../utils';

export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SegmentedControlProps {
  /** Two or three options. */
  options: Array<string | SegmentedOption>;
  /** The selected value. */
  value: string;
  onChange?: (value: string) => void;
  /** Accessible name for the group. */
  label: string;
  disabled?: boolean;
  /** Pin the pressed look on one segment (documentation only). */
  pressedValue?: string;
  /** Pin the focused look on one segment (documentation only). */
  focusedValue?: string;
  className?: string;
}

/**
 * Switch between two or three views of the same content (All / Verified / Self-input; Tap / QR code).
 * @example <SegmentedControl label="Source" options={['All', 'Verified', 'Self-input']} value="All" onChange={setSource} />
 */
export function SegmentedControl({ options, value, onChange, label, disabled, pressedValue, focusedValue, className }: SegmentedControlProps) {
  return (
    <div role="group" aria-label={label} className={cx('bb-seg', className)}>
      {options.map((o) => {
        const opt = typeof o === 'string' ? { value: o, label: o } : o;
        const on = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            aria-pressed={on}
            disabled={disabled || opt.disabled}
            className={cx('bb-seg-btn', pressedValue === opt.value && 'is-pressed', focusedValue === opt.value && 'is-focused')}
            onClick={() => onChange?.(opt.value)}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
