import * as React from 'react';
import { Icon, type IconName } from './Icon';
import { cx, stateClass, type PreviewState } from '../utils';

export interface QuickActionProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** primary (blue) for sharing, secondary (cyan) for scanning. */
  tone?: 'primary' | 'secondary';
  icon?: IconName;
  /** English action name. */
  title: string;
  /** Filipino or helper line under the title. */
  subtitle?: string;
  /** Pin the pressed or focused look (documentation only). */
  state?: PreviewState;
}

/**
 * Big two-line action tile that starts one of the app's main flows (Tap to share, Scan reseta); use them as a pair in a two-column grid.
 * @example <QuickAction tone="secondary" icon="scan" title="Scan reseta" subtitle="Add a medicine" />
 */
export function QuickAction({ tone = 'primary', icon = 'contactless', title, subtitle, state, className, type = 'button', ...rest }: QuickActionProps) {
  return (
    <button type={type} {...rest} className={cx('bb-qa', `bb-qa-${tone}`, stateClass(state), className)}>
      <span className="bb-qa-icon"><Icon name={icon} /></span>
      <span className="bb-qa-text">
        <span className="bb-qa-title">{title}</span>
        {subtitle ? <span className="bb-qa-sub">{subtitle}</span> : null}
      </span>
    </button>
  );
}
