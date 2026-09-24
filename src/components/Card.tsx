import * as React from 'react';
import { cx, stateClass, type PreviewState } from '../utils';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** surface: default white card. brand: the health card. allergy: the pinned allergy block. active: live access / selected. */
  variant?: 'surface' | 'brand' | 'allergy' | 'active';
  /** Makes the whole card a link. */
  href?: string;
  disabled?: boolean;
  /** Pin the pressed or focused look (documentation only). */
  state?: PreviewState;
}

/**
 * Container that groups one object on a screen; pick the variant by meaning (surface, brand health card, allergy block, active access).
 * @example <Card variant="allergy" href="/records/allergies"><span className="bb-card-title">Allergies</span></Card>
 */
export function Card({ variant = 'surface', href, disabled, state, className, children, onClick, ...rest }: CardProps) {
  const interactive = Boolean(href || onClick);
  const classes = cx('bb-card', `bb-card-${variant}`, interactive && 'bb-card-interactive', stateClass(state), className);
  const common = { ...rest, className: classes, 'aria-disabled': disabled || undefined };
  if (href) return <a href={href} onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>} {...common}>{children}</a>;
  if (onClick) return <button type="button" onClick={onClick as React.MouseEventHandler<HTMLButtonElement>} {...common}>{children}</button>;
  return <div {...common}>{children}</div>;
}
