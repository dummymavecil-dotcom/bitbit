import * as React from 'react';
import { Tag, type Provenance } from './Tag';
import { cx } from '../utils';

export interface RecordRowProps {
  /** Short month, e.g. "Mar". */
  month: string;
  year: string;
  /** What was recorded, e.g. "HbA1c". */
  name: string;
  /** The value as reported, with the reference range when there is one. Never an interpretation. */
  detail: string;
  /** Who vouches for it: "Reviewed by Dr. … · Facility", "Copied from prescription · Clinic" or "Added by you". */
  source?: string;
  /** Which tag the row shows. */
  provenance?: Provenance;
  /** Legacy: true = provider, false = patient. Use provenance. */
  verified?: boolean;
  className?: string;
}

/**
 * One health record in a list: date badge, name, reported value, source line and its provenance tag.
 * @example <RecordRow month="Aug" year="2026" name="Amlodipine 5 mg" detail="1 tablet once daily" source="Copied from prescription · Riverside Clinic" provenance="document" />
 */
export function RecordRow({ month, year, name, detail, source, provenance, verified, className }: RecordRowProps) {
  return (
    <article className={cx('bb-row', className)}>
      <div className="bb-row-date">
        <span className="bb-row-mon">{month}</span>
        <span className="bb-row-yr">{year}</span>
      </div>
      <div className="bb-row-main">
        <div className="bb-row-head">
          <span className="bb-row-name">{name}</span>
          <Tag kind={provenance ?? (verified ? 'provider' : 'patient')} />
        </div>
        <span className="bb-row-detail">{detail}</span>
        {source ? <span className="bb-row-source">{source}</span> : null}
      </div>
    </article>
  );
}
