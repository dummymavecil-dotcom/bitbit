import * as React from 'react';
import { Icon, type IconName } from './Icon';
import { cx, stateClass, type PreviewState } from '../utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary: the one main action per screen. secondary: outline alternative. danger: revoke or delete. */
  variant?: 'primary' | 'secondary' | 'danger';
  /** lg = 56px, for the primary call to action. md = 52px (default). */
  size?: 'md' | 'lg';
  /** Stretch to the full width of the container. */
  block?: boolean;
  /** Leading icon, only when it names the output (e.g. "printer" for Print). */
  icon?: IconName;
  /** Pin the pressed or focused look (documentation only). */
  state?: PreviewState;
}

/**
 * Button for an action on the current screen: primary once per screen, secondary for alternatives, danger for revoking access.
 * @example <Button variant="primary" size="lg" block>Start sharing</Button>
 */
export function Button({ variant = 'primary', size = 'md', block, icon, state, className, children, type = 'button', ...rest }: ButtonProps) {
  return (
    <button type={type} {...rest} className={cx('bb-btn', `bb-btn-${variant}`, size === 'lg' && 'bb-btn-lg', block && 'bb-btn-block', stateClass(state), className)}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </button>
  );
}
