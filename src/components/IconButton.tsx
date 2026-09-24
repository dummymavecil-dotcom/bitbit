import * as React from 'react';
import { Icon, type IconName } from './Icon';
import { cx, stateClass, type PreviewState } from '../utils';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** surface on light screens, inverse on the dark camera screen. */
  variant?: 'surface' | 'inverse';
  icon: IconName;
  /** Accessible name (required - the button has no visible text). */
  label: string;
  /** Show the unread dot. */
  dot?: boolean;
  /** Pin the pressed or focused look (documentation only). */
  state?: PreviewState;
}

/**
 * Round 44px icon-only button (bell, search, back, close, flash); always pass `label`.
 * @example <IconButton icon="bell" label="Access alerts, 1 new" dot />
 */
export function IconButton({ variant = 'surface', icon, label, dot, state, className, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button type={type} aria-label={label} {...rest} className={cx('bb-iconbtn', `bb-iconbtn-${variant}`, stateClass(state), className)}>
      <Icon name={icon} />
      {dot ? <span className="bb-iconbtn-dot" /> : null}
    </button>
  );
}
