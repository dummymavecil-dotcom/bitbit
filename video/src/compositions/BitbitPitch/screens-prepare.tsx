import { useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon, ProvenanceTag, ScreenImage, type IconName, type Provenance } from '../../components';
import { COLORS } from '../../theme';
import { EASE, mix, progress, sec } from '../../utils';
import { Card, Chip, IconTile, Overline, PrimaryButton, RoundButton } from '../BitbitExplainer/screens/ui';

/** Patient-app Prepare screens (09, 10, 14 rebuilt; review-before-share new). Times are screen-local seconds. */

const useP = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (d: number, dur = 0.4, e = EASE.enter) => progress(frame, sec(d, fps), sec(dur, fps), e);
};

/** Header with back button, title, "n of 6" and the six-segment progress bar. */
const PrepareHeader: React.FC<{ step: number }> = ({ step }) => (
  <>
    <div style={{ position: 'absolute', top: 56, left: 20, right: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
      <RoundButton icon="chevronLeft" />
      <div style={{ flex: 1, fontSize: 18, fontWeight: 800 }}>Prepare for a visit</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.textTertiary }}>{step} of 6</div>
    </div>
    <div style={{ position: 'absolute', top: 112, left: 20, right: 20, display: 'flex', gap: 4 }}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i < step ? COLORS.blue600 : COLORS.neutral300 }} />
      ))}
    </div>
  </>
);

const SafetyLine: React.FC<{ top: number }> = ({ top }) => (
  <div style={{ position: 'absolute', top, left: 20, right: 20, display: 'flex', gap: 12, alignItems: 'center', background: COLORS.pink100, border: `1.5px solid ${COLORS.pink700}`, borderRadius: 18, padding: '12px 14px' }}>
    <div style={{ width: 36, height: 36, borderRadius: 18, background: COLORS.pink700, color: COLORS.white, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon name="phone" size={18} />
    </div>
    <div style={{ fontSize: 13.5, lineHeight: 1.4 }}>
      <b>Severe pain or trouble breathing?</b> Go to the nearest ER or call <b>911</b> now.
    </div>
  </div>
);

const WORDS = 'Masakit dibdib ko since this morning at medyo nahihilo ako.';

/** 09 · What's bothering you today? The text types itself in. */
export const FeelingScreen: React.FC<{ typeAt?: number; typeDur?: number }> = ({ typeAt = 0.3, typeDur = 2.6 }) => {
  const p = useP();
  const typed = p(typeAt, typeDur, EASE.linear);
  const n = Math.round(WORDS.length * typed);
  const tag = p(typeAt + typeDur + 0.1, 0.35);
  return (
    <>
      <PrepareHeader step={1} />
      <div style={{ position: 'absolute', top: 136, left: 20, right: 20 }}>
        <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.025em' }}>What&apos;s bothering you today?</div>
        <div style={{ fontSize: 14, color: COLORS.textTertiary, marginTop: 4 }}>Your own words are fine.</div>
      </div>
      <div style={{ position: 'absolute', top: 206, left: 20, right: 20, height: 170, background: COLORS.white, border: `1.5px solid ${COLORS.neutral450}`, borderRadius: 20, padding: 16, boxSizing: 'border-box' }}>
        <div style={{ fontSize: 16, lineHeight: 1.5 }}>
          {WORDS.slice(0, n)}
          {typed < 1 ? <span style={{ display: 'inline-block', width: 2, height: 18, background: COLORS.blue600, verticalAlign: 'middle', marginLeft: 1 }} /> : null}
        </div>
        <div style={{ position: 'absolute', right: 14, bottom: 10, fontSize: 12, color: COLORS.textTertiary, fontVariantNumeric: 'tabular-nums' }}>{n}/500</div>
      </div>
      <div style={{ position: 'absolute', top: 392, left: 20, right: 20, height: 50, borderRadius: 16, border: `1.5px dashed ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700 }}>
        <Icon name="mic" size={18} /> Speak instead
      </div>
      <SafetyLine top={458} />
      <div style={{ position: 'absolute', top: 548, left: 20, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: COLORS.textTertiary, opacity: tag, transform: `translateY(${mix(tag, 8, 0)}px)` }}>
        Saved as <ProvenanceTag kind="patient" />
      </div>
      <PrimaryButton label="Continue" icon="arrowRight" style={{ position: 'absolute', top: 590, left: 20, right: 20 }} />
    </>
  );
};

const Dropdown: React.FC<{ value: string; show: number }> = ({ value, show }) => (
  <div style={{ height: 44, borderRadius: 14, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 15, fontWeight: 600, background: COLORS.white }}>
    <span style={{ opacity: show }}>{value}</span>
    <Icon name="chevronDown" size={18} />
  </div>
);

/** 10 · A few quick questions. Answers fill one by one. */
export const QuestionsScreen: React.FC<{ at?: number }> = ({ at = 0.4 }) => {
  const p = useP();
  const a1 = p(at, 0.3);
  const a2 = p(at + 0.7, 0.3);
  const chip = p(at + 1.4, 0.2, EASE.standard);
  const typed = p(at + 2.1, 1.0, EASE.linear);
  const extra = 'Medyo nahihilo rin ako.';
  const Q: React.FC<{ n: number; q: string; children: React.ReactNode }> = ({ n, q, children }) => (
    <div style={{ padding: '10px 0', borderBottom: `1px solid ${COLORS.neutral150}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: 13, background: COLORS.blue100, color: COLORS.blue600, fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
        <div style={{ fontSize: 15.5, fontWeight: 800 }}>{q}</div>
      </div>
      {children}
    </div>
  );
  return (
    <>
      <PrepareHeader step={2} />
      <div style={{ position: 'absolute', top: 136, left: 20, fontSize: 25, fontWeight: 800, letterSpacing: '-0.025em' }}>A few quick questions.</div>
      <div style={{ position: 'absolute', top: 180, left: 20, right: 20, background: COLORS.neutral100, borderRadius: 16, padding: '10px 14px' }}>
        <Overline>Your words</Overline>
        <div style={{ fontSize: 13.5, color: COLORS.textSecondary, marginTop: 3 }}>&ldquo;{WORDS}&rdquo;</div>
      </div>
      <Card style={{ position: 'absolute', top: 262, left: 20, right: 20, padding: '4px 14px' }}>
        <Q n={1} q="When did it start?">
          <Dropdown value="This morning" show={a1} />
        </Q>
        <Q n={2} q="Where do you feel it?">
          <Dropdown value="Chest" show={a2} />
        </Q>
        <Q n={3} q="How would you describe it?">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <Chip label="Pressure / heaviness" selected={chip} style={{ height: 36, fontSize: 13.5 }} />
            {['Sharp', 'Burning', 'Dull ache'].map((c) => (
              <Chip key={c} label={c} style={{ height: 36, fontSize: 13.5 }} />
            ))}
          </div>
        </Q>
        <div style={{ padding: '10px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 13, background: COLORS.blue100, color: COLORS.blue600, fontSize: 13, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>4</div>
            <div style={{ fontSize: 15.5, fontWeight: 800 }}>Anything else?</div>
          </div>
          <div style={{ height: 44, borderRadius: 14, border: `1.5px solid ${COLORS.neutral450}`, display: 'flex', alignItems: 'center', padding: '0 14px', fontSize: 15, background: COLORS.white }}>{extra.slice(0, Math.round(extra.length * typed))}</div>
        </div>
      </Card>
      <div style={{ position: 'absolute', top: 730, left: 20, right: 20, height: 46, borderRadius: 14, border: `1px dashed ${COLORS.yellow600}`, background: COLORS.yellow100, color: COLORS.yellow700, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', fontSize: 14 }}>
        <Icon name="pencil" size={16} /> Your answers, <b>not a diagnosis.</b>
      </div>
    </>
  );
};

/** A screenshot revealed top to bottom below `fromY` (app px), like content loading in. */
export const ScreenReveal: React.FC<{ name: string; at?: number; dur?: number; fromY?: number }> = ({ name, at = 0.2, dur = 1.2, fromY = 124 }) => {
  const p = useP();
  const r = p(at, dur, EASE.inOut);
  const top = mix(r, fromY, 844);
  return (
    <>
      <ScreenImage name={name} />
      <div style={{ position: 'absolute', left: 0, right: 0, top, bottom: 0, background: COLORS.bg }} />
    </>
  );
};

type Item = { over: string; title: string; tag: Provenance; meta?: string; icon: IconName; pink?: boolean; on: boolean };
export const SHARE_ITEMS: Item[] = [
  { over: "Why I'm seeking care", title: 'Chest discomfort + dizziness', tag: 'patient', meta: 'Today · 8:42 AM', icon: 'clipboard', on: true },
  { over: 'Known allergy', title: 'Penicillin · hives', tag: 'provider', icon: 'alert', pink: true, on: true },
  { over: 'Known allergy', title: 'Shrimp · lip swelling', tag: 'patient', icon: 'alert', pink: true, on: true },
  { over: 'Current medication', title: 'Amlodipine 5 mg · once daily', tag: 'document', meta: 'Aug 12, 2026', icon: 'pill', on: true },
  { over: 'Known condition', title: 'Hypertension · since 2024', tag: 'provider', icon: 'stethoscope', on: true },
  { over: 'Last visit', title: 'BP 136/86 · HR 76', tag: 'provider', meta: 'Sep 18, 2026', icon: 'vitals', on: true },
  { over: 'Recent result', title: 'CBC + lipid panel', tag: 'document', meta: 'May 4, 2026', icon: 'flask', on: false },
  { over: 'Family history', title: 'Father: hypertension · Mother: type 2 diabetes', tag: 'patient', icon: 'user', on: true },
  { over: 'Previous medication', title: 'Losartan 50 mg · stopped Feb 21, 2026', tag: 'provider', icon: 'pill', on: false },
  { over: 'Other results', title: 'Creatinine, ECG + 1 more', tag: 'document', meta: '3 records', icon: 'flask', on: false },
];

/** 14 · What do you want to share? `toggles` flip items (by index) at the given times. */
export const ShareChecklistScreen: React.FC<{ scrollAt?: number; toggles?: { index: number; at: number }[] }> = ({ scrollAt, toggles = [] }) => {
  const p = useP();
  const scroll = scrollAt === undefined ? 0 : p(scrollAt, 0.6, EASE.inOut);
  const state = SHARE_ITEMS.map((it, i) => {
    const tg = toggles.find((t) => t.index === i);
    const k = tg ? p(tg.at, 0.15, EASE.standard) : 0;
    return { on: k > 0.5 ? !it.on : it.on, press: tg ? Math.max(0, 1 - Math.abs(p(tg.at - 0.08, 0.3, EASE.linear) - 0.5) * 2) : 0 };
  });
  const count = state.filter((s) => s.on).length;
  return (
    <>
      <PrepareHeader step={6} />
      <div style={{ position: 'absolute', top: 136, left: 20, right: 20 }}>
        <div style={{ fontSize: 25, fontWeight: 800, letterSpacing: '-0.025em' }}>What do you want to share?</div>
        <div style={{ fontSize: 14, color: COLORS.textTertiary, marginTop: 4 }}>Suggested for this visit.</div>
      </div>
      <div style={{ position: 'absolute', top: 206, left: 0, right: 0, bottom: 150, overflow: 'hidden' }}>
        <div style={{ padding: '0 20px', transform: `translateY(${mix(scroll, 0, -330)}px)` }}>
          {SHARE_ITEMS.map((it, i) => {
            const on = state[i].on;
            return (
              <div
                key={it.title}
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  padding: '10px 12px',
                  marginBottom: 8,
                  borderRadius: 18,
                  background: on ? COLORS.blue100 : COLORS.white,
                  border: `1.5px solid ${on ? COLORS.blue500 : COLORS.neutral150}`,
                  transform: `scale(${1 - 0.015 * state[i].press})`,
                }}
              >
                <div style={{ width: 26, height: 26, borderRadius: 7, flexShrink: 0, background: on ? COLORS.blue600 : COLORS.white, border: on ? 'none' : `2px solid ${COLORS.neutral450}`, color: COLORS.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {on ? <Icon name="check" size={16} strokeWidth={3} /> : null}
                </div>
                <IconTile icon={it.icon} tone={it.pink ? 'pink' : 'blue'} size={34} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Overline color={it.pink ? COLORS.pink700 : COLORS.textTertiary} style={{ fontSize: 10.5 }}>
                    {it.over}
                  </Overline>
                  <div style={{ fontSize: 14, fontWeight: 700, marginTop: 1, lineHeight: 1.25 }}>{it.title}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    <ProvenanceTag kind={it.tag} size={0.82} />
                    {it.meta ? <span style={{ fontSize: 11, color: COLORS.textTertiary }}>{it.meta}</span> : null}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 150, background: COLORS.white, borderTop: `1px solid ${COLORS.neutral150}`, padding: '16px 20px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 800 }}>
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{count} items selected</span>
          <span style={{ color: COLORS.blue600 }}>Select all</span>
        </div>
        <PrimaryButton label="Continue to share" icon="arrowRight" style={{ marginTop: 14 }} />
      </div>
    </>
  );
};

/** New · Review before sharing: what travels and what stays private. */
export const ReviewShareScreen: React.FC<{ at?: number }> = ({ at = 0.2 }) => {
  const p = useP();
  const shared = SHARE_ITEMS.filter((it, i) => (i === 6 ? true : i === 7 ? false : it.on));
  const kept = SHARE_ITEMS.filter((it, i) => (i === 7 ? true : i === 6 ? false : !it.on));
  return (
    <>
      <div style={{ position: 'absolute', top: 56, left: 20, right: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
        <RoundButton icon="chevronLeft" />
        <div>
          <div style={{ fontSize: 20, fontWeight: 800 }}>Review before sharing</div>
          <div style={{ fontSize: 13, color: COLORS.textTertiary }}>Rizal District Hospital · this visit only</div>
        </div>
      </div>
      <div style={{ position: 'absolute', top: 124, left: 20, right: 20 }}>
        <Overline color={COLORS.blue700}>Will be shared · {shared.length}</Overline>
        <div style={{ marginTop: 8, background: COLORS.white, border: `1px solid ${COLORS.neutral150}`, borderRadius: 18, padding: '4px 12px' }}>
          {shared.map((it, i) => (
            <div key={it.title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderTop: i ? `1px solid ${COLORS.neutral150}` : 'none', opacity: p(at + i * 0.07, 0.3) }}>
              <IconTile icon={it.icon} tone={it.pink ? 'pink' : 'blue'} size={28} />
              <div style={{ flex: 1, fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.title}</div>
              <ProvenanceTag kind={it.tag} size={0.78} />
            </div>
          ))}
        </div>
        <Overline style={{ marginTop: 16 }}>Stays private · {kept.length}</Overline>
        <div style={{ marginTop: 8, background: COLORS.neutral100, borderRadius: 18, padding: '4px 12px' }}>
          {kept.map((it, i) => (
            <div key={it.title} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i ? `1px solid ${COLORS.neutral150}` : 'none', color: COLORS.textSecondary, opacity: p(at + 0.6 + i * 0.1, 0.3) }}>
              <Icon name="lock" size={16} />
              <div style={{ fontSize: 13, fontWeight: 600 }}>{it.over}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 128, background: COLORS.white, borderTop: `1px solid ${COLORS.neutral150}`, padding: '14px 20px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: COLORS.textSecondary }}>
          <Icon name="clock" size={15} /> This visit only · Access ends today, 6:00 PM
        </div>
        <PrimaryButton label="Share with Rizal District Hospital" style={{ marginTop: 12, fontSize: 16 }} />
      </div>
    </>
  );
};
