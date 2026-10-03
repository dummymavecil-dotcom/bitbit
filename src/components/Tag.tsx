import * as React from 'react';
import { Icon, type IconName } from './Icon';
import { cx } from '../utils';

/** Who vouches for a record, highest first: provider-reviewed > document-sourced > patient-reported. */
export type Provenance = 'provider' | 'document' | 'patient';

const KINDS: Record<Provenance, { icon: IconName; label: string }> = {
  provider: { icon: 'verified', label: 'Provider-reviewed' },
  document: { icon: 'file', label: 'Document-sourced' },
  patient: { icon: 'pencil', label: 'Patient-reported' },
};

export interface TagProps {
  /** provider: entered or reviewed by a provider. document: copied from a scanned paper, original attached. patient: entered by the patient. ('verified' and 'self' are legacy aliases.) */
  kind: Provenance | 'verified' | 'self';
  /** Override the label. */
  children?: React.ReactNode;
  className?: string;
}

function normalize(kind: TagProps['kind']): Provenance {
  if (kind === 'verified') return 'provider';
  if (kind === 'self') return 'patient';
  return kind;
}

/**
 * Provenance tag every record carries: Provider-reviewed, Document-sourced (copied from a scanned paper) or Patient-reported.
 * @example <Tag kind="document" />
 */
export function Tag({ kind, children, className }: TagProps) {
  const k = normalize(kind);
  return (
    <span className={cx('bb-tag', `bb-tag-${k}`, className)}>
      <Icon name={KINDS[k].icon} size={12} strokeWidth={2.6} />
      {children ?? KINDS[k].label}
    </span>
  );
}
