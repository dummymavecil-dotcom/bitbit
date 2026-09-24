import * as React from 'react';
import { Tag } from './Tag';
import { cx } from '../utils';

export interface RecordRowProps {
  /** Short month, e.g. "Mar". */
  month: string;
  year: string;
  /** What was recorded, e.g. "HbA1c". */
  name: string;
  /** The value as reported, with the reference range when there is one. Never an interpretation. */
  detail: string;
  /** Who vouches for it: "Verified by Dr. … · Facility" or "Added by you". */
  source?: string;
  verified: boolean;
  className?: string;
}

/**
 * One health record in a list: date badge, name, reported value, source line and its Verified / Self-input tag.
 * @example <RecordRow month="Mar" year="2026" name="HbA1c" detail="6.8% · ref. below 5.7%" source="Verified · San Roque Health Center lab" verified />
 */
export function RecordRow({ month, year, name, detail, source, verified, className }: RecordRowProps) {
  return (
    <article className={cx('bb-row', className)}>
      <div className="bb-row-date">
        <span className="bb-row-mon">{month}</span>
        <span className="bb-row-yr">{year}</span>
      </div>
      <div className="bb-row-main">
        <div className="bb-row-head">
          <span className="bb-row-name">{name}</span>
          <Tag kind={verified ? 'verified' : 'self'} />
        </div>
        <span className="bb-row-detail">{detail}</span>
        {source ? <span className="bb-row-source">{source}</span> : null}
      </div>
    </article>
  );
}
