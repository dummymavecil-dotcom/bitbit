import * as React from 'react';
import { Icon } from './Icon';
import { cx } from '../utils';

export interface TagProps {
  /** verified: confirmed by a provider. self: entered by the patient. */
  kind: 'verified' | 'self';
  /** Override the label (defaults to "Verified" / "Self-input"). */
  children?: React.ReactNode;
  className?: string;
}

/**
 * Provenance tag every record carries: Verified (a provider confirmed it) or Self-input (the patient entered it).
 * @example <Tag kind="self" />
 */
export function Tag({ kind, children, className }: TagProps) {
  const verified = kind !== 'self';
  return (
    <span className={cx('bb-tag', verified ? 'bb-tag-verified' : 'bb-tag-self', className)}>
      <Icon name={verified ? 'verified' : 'pencil'} size={12} strokeWidth={2.6} />
      {children ?? (verified ? 'Verified' : 'Self-input')}
    </span>
  );
}
