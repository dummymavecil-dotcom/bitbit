import * as React from 'react';
import { Icon } from './Icon';
import { cx, stateClass, type PreviewState } from '../utils';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** filter: pill that switches a list. choice: pick one option. toggle: pick many, with a checkbox. */
  variant?: 'filter' | 'choice' | 'toggle';
  selected?: boolean;
  /** Pin the pressed or focused look (documentation only). */
  state?: PreviewState;
}

/**
 * Selectable chip for a small visible set of options: category filters, a duration choice, or multi-select toggles.
 * @example <Chip variant="toggle" selected>Allergies</Chip>
 */
export function Chip({ variant = 'filter', selected = false, state, className, children, type = 'button', ...rest }: ChipProps) {
  return (
    <button type={type} aria-pressed={selected} {...rest} className={cx('bb-chip', `bb-chip-${variant}`, stateClass(state), className)}>
      {variant === 'toggle' ? <span className="bb-check">{selected ? <Icon name="check" size={14} strokeWidth={3} /> : null}</span> : null}
      {children}
    </button>
  );
}
