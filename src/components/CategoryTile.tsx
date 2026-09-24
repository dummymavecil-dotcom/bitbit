import * as React from 'react';
import { Icon, type IconName } from './Icon';
import { cx, stateClass, type PreviewState } from '../utils';

export interface CategoryTileProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** blue or cyan; alternate them in a checkerboard. Pink and yellow are reserved for allergies and Self-input. */
  tone?: 'blue' | 'cyan';
  icon: IconName;
  title: string;
  /** One line summarising the latest entries. */
  detail?: string;
  /** Number of records, shown top-right. */
  count?: string | number;
  href?: string;
  disabled?: boolean;
  /** Pin the pressed or focused look (documentation only). */
  state?: PreviewState;
}

/**
 * Tile that opens one record category from the 2×3 grid on Home (Vitals, Medication, Conditions, Lab results, Immunization, Procedures).
 * @example <CategoryTile tone="cyan" icon="pill" title="Medication" detail="Losartan, Metformin" count={2} href="/records/medication" />
 */
export function CategoryTile({ tone = 'blue', icon, title, detail, count, href, disabled, state, className, ...rest }: CategoryTileProps) {
  const classes = cx('bb-tile', `bb-tile-${tone}`, stateClass(state), className);
  const body = (
    <>
      <span className="bb-tile-top">
        <span className="bb-tile-icon"><Icon name={icon} size={18} /></span>
        {count != null ? <span className="bb-tile-count">{count}</span> : null}
      </span>
      <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span className="bb-tile-title">{title}</span>
        {detail ? <span className="bb-tile-detail">{detail}</span> : null}
      </span>
    </>
  );
  if (href) return <a href={href} aria-disabled={disabled || undefined} {...rest} className={classes}>{body}</a>;
  return <button type="button" aria-disabled={disabled || undefined} {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>{body}</button>;
}
