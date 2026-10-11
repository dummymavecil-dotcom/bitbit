import { evolvePath } from '@remotion/paths';
import { interpolate, random, useCurrentFrame, useVideoConfig } from 'remotion';
import { Icon, Logo, ScreenCrop, type IconName } from '../../../components';
import { COLORS } from '../../../theme';
import { EASE, mix, progress, sec } from '../../../utils';
import { Center, Enter, LeftStatement, phoneShapes, Shapes, Stage } from '../../BitbitExplainer/shots/common';
import { BrandCard, RightPhone } from '../../BitbitExplainer/shots/Part1';
import { DeskZeroSign, Timer, useCount } from '../kit';
import { ScreenReveal } from '../screens-prepare';

/* Parts 6–8: business model, scale and impact, close. Times are seconds from each scene's start. */

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const useLocal = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return { frame, fps, t: frame / fps, p: (d: number, dur = 0.6, e = EASE.enter) => progress(frame, sec(d, fps), sec(dur, fps), e) };
};

const Kicker: React.FC<{ text: string; at?: number; left?: number; top?: number; center?: boolean }> = ({ text, at = 0.1, left = 140, top = 80, center }) => (
  <Enter delay={at} rise={12} style={center ? { position: 'absolute', left: 0, right: 0, top, textAlign: 'center' } : { position: 'absolute', left, top }}>
    <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.14em', color: COLORS.blue600 }}>{text}</div>
  </Enter>
);

/* ---------- Lines 39–41: the ecosystem ---------- */

type Node = { label: string; icon: IconName; x: number; y: number; at: number; detail?: string[]; detailAt?: number; fillAt?: number };
const NODES: Node[] = [
  { label: 'Providers', icon: 'stethoscope', x: 360, y: 210, at: 0.7, detail: ['₱500K per integration', 'Provider view · workflow setup', 'Training · support'], detailAt: 11.4 },
  { label: 'Health plans + insurers', icon: 'shield', x: 1560, y: 210, at: 0.9, detail: ['Sponsored access', 'Member discovery, by choice', 'Health information never sold'], detailAt: 13.2 },
  { label: 'Enterprise partners', icon: 'file', x: 960, y: 110, at: 1.1 },
  { label: 'Employers', icon: 'user', x: 300, y: 600, at: 1.3, fillAt: 15.6 },
  { label: 'LGUs + public programs', icon: 'mapPin', x: 1620, y: 600, at: 1.5, fillAt: 16.1 },
];
const HUB = { x: 960, y: 440 };

export const EcosystemScene: React.FC = () => {
  const { p, frame, fps } = useLocal();
  const marco = p(5.9, 0.6);
  const caption = p(7.2, 0.6);
  return (
    <Stage>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {NODES.map((n) => {
          const d = `M ${n.x} ${n.y} L ${HUB.x} ${HUB.y}`;
          const k = progress(frame, sec(n.at + 0.3, fps), sec(0.5, fps), EASE.inOut);
          const ev = evolvePath(k, d);
          return <path key={n.label} d={d} stroke={COLORS.blue300} strokeWidth={4} strokeDasharray={ev.strokeDasharray} strokeDashoffset={ev.strokeDashoffset} fill="none" />;
        })}
        {(() => {
          const d = `M ${HUB.x} ${HUB.y} L ${HUB.x} 700`;
          const ev = evolvePath(p(5.8, 0.4, EASE.inOut), d);
          return <path d={d} stroke={COLORS.blue300} strokeWidth={4} strokeDasharray={ev.strokeDasharray} strokeDashoffset={ev.strokeDashoffset} fill="none" />;
        })()}
      </svg>
      <Enter delay={0.15} rise={0} scaleFrom={0.8} style={{ position: 'absolute', left: HUB.x - 130, top: HUB.y - 130 }}>
        <div style={{ width: 260, height: 260, borderRadius: 130, background: COLORS.white, border: `2px solid ${COLORS.neutral150}`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <Logo kind="mark" width={92} />
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.textSecondary }}>One patient-held record</div>
        </div>
      </Enter>
      {NODES.map((n) => {
        const open = n.detailAt === undefined ? 0 : p(n.detailAt, 0.5, EASE.inOut);
        const fill = n.fillAt === undefined ? 0 : p(n.fillAt, 0.35, EASE.standard);
        return (
          <Enter key={n.label} delay={n.at} rise={24} style={{ position: 'absolute', left: n.x - 200, top: n.y - 50 }}>
            <div
              style={{
                width: 400,
                borderRadius: 28,
                background: fill > 0.5 ? COLORS.blue600 : COLORS.white,
                color: fill > 0.5 ? COLORS.white : COLORS.ink,
                border: `2px solid ${open > 0.5 ? COLORS.blue500 : COLORS.neutral150}`,
                padding: '22px 26px',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: 18, background: fill > 0.5 ? COLORS.blue700 : COLORS.blue100, color: fill > 0.5 ? COLORS.white : COLORS.blue600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={n.icon} size={30} />
                </div>
                <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1 }}>{n.label}</div>
              </div>
              {n.detail ? (
                <div style={{ height: mix(open, 0, 128), overflow: 'hidden', opacity: open }}>
                  {n.detail.map((d, i) => (
                    <div key={d} style={{ fontSize: i === 0 ? 30 : 23, fontWeight: i === 0 ? 800 : 600, color: i === 0 ? COLORS.blue600 : COLORS.textSecondary, marginTop: i === 0 ? 16 : 6 }}>
                      {d}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </Enter>
        );
      })}
      <div style={{ position: 'absolute', left: 960 - 280, top: 700, width: 560, opacity: marco, transform: `translateY(${mix(marco, 30, 0)}px)` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22, background: COLORS.white, borderRadius: 28, border: `2px solid ${COLORS.neutral150}`, padding: '22px 30px' }}>
          <div style={{ width: 84, height: 84, borderRadius: 42, background: COLORS.cyan400, fontSize: 32, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MD</div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: COLORS.textSecondary }}>Marco pays</div>
            <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1, color: COLORS.blue600 }}>₱0</div>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 920, textAlign: 'center', opacity: caption, fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>
        The patient is the user. <span style={{ color: COLORS.blue600 }}>The ecosystem is the customer.</span>
      </div>
    </Stage>
  );
};

/* ---------- Line 42: free, with full control ---------- */

export const FreeScene: React.FC = () => (
  <Stage>
    <Shapes shapes={phoneShapes(1)} />
    <LeftStatement text={'Free for Marco.\nHis data, his call.'} kicker="FULL CONTROL" size={88} />
    <div style={{ position: 'absolute', left: 160, top: 660, display: 'flex', gap: 18 }}>
      <Enter delay={1.0} rise={16}>
        <div style={{ padding: '16px 26px', borderRadius: 999, background: COLORS.blue600, color: COLORS.white, fontSize: 32, fontWeight: 800 }}>₱0 for patients</div>
      </Enter>
      <Enter delay={1.3} rise={16}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '16px 26px', borderRadius: 999, background: COLORS.white, border: `2px solid ${COLORS.neutral150}`, fontSize: 30, fontWeight: 700 }}>
          <Icon name="eye" size={28} /> Every read is logged
        </div>
      </Enter>
    </div>
    <RightPhone>
      <ScreenReveal name="04-access-log" at={0.3} dur={1.4} />
    </RightPhone>
  </Stage>
);

/* ---------- Line 43: AI-integrated ---------- */

export const AiCardScene: React.FC = () => <BrandCard footer="ALL POWERED BY AN AI-INTEGRATED SYSTEM" footerAt={1.2} />;

/* ---------- Line 44: AI organizes, providers review, patients decide ---------- */

const STEPS: { n: string; title: string; sub: string; icon: IconName; at: number }[] = [
  { n: '01', title: 'AI organizes', sub: 'Extract. Structure. Prepare.', icon: 'sparkle', at: 0.1 },
  { n: '02', title: 'Sources prove', sub: 'Evidence stays attached.', icon: 'file', at: 0.9 },
  { n: '03', title: 'Providers review', sub: 'Clinical review stays human.', icon: 'stethoscope', at: 0.9 },
  { n: '04', title: 'Patients decide what travels', sub: 'Consent before the share.', icon: 'check', at: 1.8 },
];

export const StepsScene: React.FC = () => {
  const { p } = useLocal();
  return (
    <Stage>
      <div style={{ position: 'absolute', left: 110, top: 220, display: 'flex', gap: 30 }}>
        {STEPS.map((s, i) => {
          const lit = p(s.at + (i === 2 ? 0.15 : 0), 0.35, EASE.standard);
          return (
            <Enter key={s.n} delay={0.05 + i * 0.08} rise={30}>
              <div style={{ width: 400, height: 420, borderRadius: 32, padding: 40, boxSizing: 'border-box', background: lit > 0.5 ? COLORS.blue600 : COLORS.white, color: lit > 0.5 ? COLORS.white : COLORS.ink, border: `2px solid ${lit > 0.5 ? COLORS.blue600 : COLORS.neutral150}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.8 }}>{s.n}</div>
                  <Icon name={s.icon} size={56} />
                </div>
                <div style={{ fontSize: 50, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.05, marginTop: 70 }}>{s.title}</div>
                <div style={{ fontSize: 26, fontWeight: 600, marginTop: 18, opacity: 0.85 }}>{s.sub}</div>
              </div>
            </Enter>
          );
        })}
      </div>
      <Enter delay={2.3} rise={14} style={{ position: 'absolute', left: 0, right: 0, top: 740, textAlign: 'center' }}>
        <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.035em' }}>
          AI assists. <span style={{ color: COLORS.blue600 }}>Humans stay in control.</span>
        </div>
      </Enter>
    </Stage>
  );
};

/* ---------- Line 45: instant value, integration later ---------- */

const Level: React.FC<{ n: string; title: string; items: string[]; at: number; strong?: boolean }> = ({ n, title, items, at, strong }) => (
  <Enter delay={at} rise={30}>
    <div style={{ width: 700, height: 470, borderRadius: 36, padding: 50, boxSizing: 'border-box', background: strong ? COLORS.blue600 : COLORS.white, color: strong ? COLORS.white : COLORS.ink, border: `2px solid ${strong ? COLORS.blue600 : COLORS.neutral150}` }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.85 }}>{n}</div>
      <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: '-0.04em', marginTop: 10 }}>{title}</div>
      <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((it) => (
          <div key={it} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 32, fontWeight: 600 }}>
            <Icon name="check" size={30} strokeWidth={3} /> {it}
          </div>
        ))}
      </div>
    </div>
  </Enter>
);

export const IntegrationScene: React.FC = () => (
  <Stage>
    <Kicker text="INSTANT VALUE FOR HOSPITALS" />
    <div style={{ position: 'absolute', left: 140, top: 160, display: 'flex', alignItems: 'center', gap: 40 }}>
      <Level n="LEVEL 1" title="Pilot now" items={['Patient-held record', 'Provider view + share packet', 'Prove the time saved']} at={0.3} strong />
      <Enter delay={1.4} rise={0} x={-20}>
        <Icon name="arrowRight" size={80} strokeWidth={2.4} color={COLORS.blue600} />
      </Enter>
      <Level n="LEVEL 2" title="Interoperate later" items={['Standards and APIs', 'Deeper hospital integration', 'More partners, same record']} at={1.6} />
    </div>
    <Enter delay={3.0} rise={14} style={{ position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center' }}>
      <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: '-0.025em' }}>
        Start light. Prove the time saved. <span style={{ color: COLORS.blue600 }}>Integrate deeper when it earns the right.</span>
      </div>
    </Enter>
  </Stage>
);

/* ---------- Line 46: one of millions ---------- */

const DOT = 46;
const GAP = 12;
const COLS = 34;
const ROWS = 19;
const DOT_COLORS = [COLORS.blue100, COLORS.blue200, COLORS.cyan100, COLORS.blue100, COLORS.blue300];

export const MillionsScene: React.FC = () => {
  const { p, t } = useLocal();
  const shrink = p(1.0, 0.8, EASE.inOut);
  const card = p(2.6, 0.6);
  const ox = (1920 - (COLS * (DOT + GAP) - GAP)) / 2;
  const oy = (1080 - (ROWS * (DOT + GAP) - GAP)) / 2;
  return (
    <Stage>
      {Array.from({ length: COLS * ROWS }).map((_, i) => {
        const c = i % COLS;
        const r = Math.floor(i / COLS);
        const x = ox + c * (DOT + GAP);
        const y = oy + r * (DOT + GAP);
        const dist = Math.hypot(x - 960, y - 540) / 1100;
        const a = interpolate(t, [1.2 + dist * 1.6, 1.5 + dist * 1.6], [0, 1], clamp);
        if (a <= 0) return null;
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: DOT, height: DOT, borderRadius: DOT / 2, background: DOT_COLORS[Math.floor(random(`dot-${i}`) * DOT_COLORS.length)], opacity: a }} />;
      })}
      <Center>
        <Enter delay={0.1} rise={0} scaleFrom={0.85}>
          <div
            style={{
              width: mix(shrink, 280, 120),
              height: mix(shrink, 280, 120),
              borderRadius: 999,
              background: COLORS.cyan400,
              color: COLORS.ink,
              fontSize: mix(shrink, 110, 46),
              fontWeight: 800,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: `8px solid ${COLORS.bg}`,
            }}
          >
            MD
          </div>
        </Enter>
      </Center>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center', opacity: card, transform: `translateY(${mix(card, 20, 0)}px)` }}>
        <div style={{ background: COLORS.white, borderRadius: 28, padding: '22px 44px', border: `2px solid ${COLORS.neutral150}`, fontSize: 52, fontWeight: 800, letterSpacing: '-0.03em' }}>
          We started with one Marco.
        </div>
      </div>
    </Stage>
  );
};

/* ---------- Line 47: the national ID, 97M ---------- */

export const NationalIdScene: React.FC = () => {
  const { p } = useLocal();
  const n = useCount(0, 97, 2.1, 1.2);
  const stat = p(2.0, 0.5);
  return (
    <Stage>
      <Kicker text="BUILT ON THE NATIONAL ID" />
      <Enter delay={0.2} rise={40} style={{ position: 'absolute', left: 140, top: 250 }}>
        <div style={{ width: 720, height: 450, borderRadius: 32, background: COLORS.white, border: `2px solid ${COLORS.neutral150}`, overflow: 'hidden', boxShadow: '0 30px 60px rgba(11,27,51,0.10)' }}>
          <div style={{ height: 90, background: COLORS.ink, color: COLORS.white, display: 'flex', alignItems: 'center', padding: '0 36px', fontSize: 28, fontWeight: 800, letterSpacing: '0.12em' }}>NATIONAL ID</div>
          <div style={{ display: 'flex', gap: 36, padding: 36 }}>
            <div style={{ width: 170, height: 210, borderRadius: 20, background: COLORS.cyan400, fontSize: 64, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>MD</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.02em' }}>Marco Dela Cruz</div>
              {[70, 55, 62].map((w, i) => (
                <div key={i} style={{ height: 16, width: `${w}%`, borderRadius: 8, background: COLORS.neutral150, marginTop: 20 }} />
              ))}
              <Enter delay={1.1} rise={10} style={{ marginTop: 30 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 999, background: COLORS.blue100, color: COLORS.blue700, fontSize: 26, fontWeight: 700 }}>
                  <Icon name="shield" size={26} /> PhilSys-linked
                </span>
              </Enter>
            </div>
          </div>
        </div>
      </Enter>
      <div style={{ position: 'absolute', left: 1010, top: 290, opacity: stat, transform: `translateY(${mix(stat, 30, 0)}px)` }}>
        <div style={{ fontSize: 300, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, color: COLORS.blue600, fontVariantNumeric: 'tabular-nums' }}>{Math.round(n)}M</div>
        <div style={{ fontSize: 44, fontWeight: 700, marginTop: 10, lineHeight: 1.2 }}>
          Filipinos already
          <br />
          enrolled in PhilSys
        </div>
      </div>
    </Stage>
  );
};

/* ---------- Line 48: 1 in 10 → 9.7M ---------- */

export const OneInTenScene: React.FC = () => {
  const { p } = useLocal();
  const pick = p(1.3, 0.35, EASE.standard);
  const up = p(2.4, 0.6, EASE.inOut);
  const stat = p(2.7, 0.5);
  const n = useCount(0, 9.7, 2.8, 1.2);
  return (
    <Stage>
      <div style={{ position: 'absolute', left: 0, right: 0, top: mix(up, 330, 150), display: 'flex', justifyContent: 'center', gap: 34, transform: `scale(${mix(up, 1, 0.7)})` }}>
        {Array.from({ length: 10 }).map((_, i) => (
          <Enter key={i} delay={0.1 + i * 0.05} rise={20}>
            <div style={{ color: i === 4 && pick > 0.5 ? COLORS.blue600 : COLORS.neutral300, transform: `scale(${i === 4 ? 1 + 0.15 * pick : 1})` }}>
              <Icon name="user" size={130} strokeWidth={1.8} />
            </div>
          </Enter>
        ))}
      </div>
      <Enter delay={1.4} rise={12} style={{ position: 'absolute', left: 0, right: 0, top: mix(up, 540, 320), textAlign: 'center' }}>
        <div style={{ fontSize: 48, fontWeight: 800 }}>Just 1 in 10 Filipinos</div>
      </Enter>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 480, textAlign: 'center', opacity: stat, transform: `translateY(${mix(stat, 30, 0)}px)` }}>
        <div style={{ fontSize: 280, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, color: COLORS.blue600, fontVariantNumeric: 'tabular-nums' }}>{n.toFixed(1)}M</div>
        <div style={{ fontSize: 48, fontWeight: 700, marginTop: 10 }}>people helped</div>
      </div>
    </Stage>
  );
};

/* ---------- Line 49: 1 → 50 hospitals, ₱180M+ ---------- */

const ROAD = [
  { n: '01', title: 'Build + baseline', when: 'Months 0–3' },
  { n: '02', title: 'Pilot', when: 'Months 3–6' },
  { n: '03', title: 'Prove', when: 'Months 6–9' },
  { n: '04', title: 'Scale', when: 'Months 9–12' },
];

export const ScaleScene: React.FC = () => {
  const { p } = useLocal();
  const hosp = useCount(1, 50, 0.4, 2.6);
  const rev = p(3.4, 0.6);
  return (
    <Stage>
      <Kicker text="YEAR ONE" />
      <div style={{ position: 'absolute', right: 140, top: 60, textAlign: 'right' }}>
        <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color: COLORS.blue600, fontVariantNumeric: 'tabular-nums' }}>{Math.round(hosp)}</div>
        <div style={{ fontSize: 30, fontWeight: 700 }}>{Math.round(hosp) === 1 ? 'hospital' : 'hospitals'}</div>
      </div>
      <div style={{ position: 'absolute', left: 140, top: 250, display: 'flex', gap: 26 }}>
        {ROAD.map((r, i) => {
          const lit = p(0.4 + i * 0.6, 0.3, EASE.standard);
          return (
            <Enter key={r.n} delay={0.1 + i * 0.08} rise={24}>
              <div style={{ width: 386, height: 220, borderRadius: 28, padding: 32, boxSizing: 'border-box', background: lit > 0.5 ? COLORS.blue600 : COLORS.white, color: lit > 0.5 ? COLORS.white : COLORS.ink, border: `2px solid ${lit > 0.5 ? COLORS.blue600 : COLORS.neutral150}` }}>
                <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.8 }}>
                  {r.n} · {r.when.toUpperCase()}
                </div>
                <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: '-0.03em', marginTop: 26 }}>{r.title}</div>
              </div>
            </Enter>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 140, top: 560, opacity: rev, transform: `translateY(${mix(rev, 30, 0)}px)` }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 30 }}>
          <div style={{ fontSize: 200, fontWeight: 800, letterSpacing: '-0.055em', lineHeight: 1, color: COLORS.blue600 }}>₱180M+</div>
          <div style={{ fontSize: 46, fontWeight: 700 }}>revenue in year one</div>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 30 }}>
          {['Sponsored access', 'Provider platform', 'Implementation', 'Enterprise integration'].map((c, i) => (
            <Enter key={c} delay={3.9 + i * 0.12} rise={10}>
              <div style={{ padding: '12px 22px', borderRadius: 999, background: COLORS.blue100, color: COLORS.blue700, fontSize: 26, fontWeight: 700 }}>{c}</div>
            </Enter>
          ))}
        </div>
      </div>
    </Stage>
  );
};

/* ---------- Line 50: year three ---------- */

const BARS = [
  { year: 'Year 1', value: '₱180M+', people: '9.7M people', h: 0.1 },
  { year: 'Year 2', value: '₱650M', people: '25M people', h: 0.36 },
  { year: 'Year 3', value: '₱1.8B+', people: '60M+ people', h: 1 },
];

export const Year3Scene: React.FC = () => {
  const { p } = useLocal();
  const base = 860;
  const maxH = 560;
  return (
    <Stage>
      <Kicker text="BY YEAR THREE" />
      <div style={{ position: 'absolute', left: 140, top: base, width: 1640, height: 3, background: COLORS.neutral300 }} />
      {BARS.map((b, i) => {
        const g = p(0.3 + i * 0.5, 0.9, EASE.inOut);
        const h = Math.max(8, maxH * b.h * g);
        const x = 300 + i * 500;
        return (
          <div key={b.year}>
            <div style={{ position: 'absolute', left: x, top: base - h, width: 280, height: h, borderRadius: '20px 20px 0 0', background: i === 2 ? COLORS.blue600 : COLORS.blue300 }} />
            <div style={{ position: 'absolute', left: x - 60, width: 400, top: base - h - 100, textAlign: 'center', opacity: p(0.6 + i * 0.5, 0.4), fontSize: 72, fontWeight: 800, letterSpacing: '-0.04em', color: i === 2 ? COLORS.blue600 : COLORS.ink }}>{b.value}</div>
            <div style={{ position: 'absolute', left: x - 60, width: 400, top: base + 22, textAlign: 'center', opacity: p(0.3 + i * 0.5, 0.4) }}>
              <div style={{ fontSize: 32, fontWeight: 800 }}>{b.year}</div>
              <div style={{ fontSize: 26, color: COLORS.textSecondary, marginTop: 4 }}>{b.people}</div>
            </div>
          </div>
        );
      })}
      <Enter delay={2.4} rise={8} style={{ position: 'absolute', right: 140, bottom: 34 }}>
        <div style={{ fontSize: 20, color: COLORS.textTertiary }}>Illustrative model, not a forecast. Assumptions to be validated in the pilot.</div>
      </Enter>
    </Stage>
  );
};

/* ---------- Line 51: Philippines → Thailand → Vietnam ---------- */

const PLACES = [
  { name: 'Philippines', verb: 'Prove', x: 330, at: 0.1 },
  { name: 'Thailand', verb: 'Adapt', x: 960, at: 0.8 },
  { name: 'Vietnam', verb: 'Expand', x: 1590, at: 1.5 },
];

export const CountriesScene: React.FC = () => {
  const { p } = useLocal();
  return (
    <Stage>
      <svg width={1920} height={1080} style={{ position: 'absolute', inset: 0 }}>
        {[0, 1].map((i) => {
          const a = PLACES[i];
          const b = PLACES[i + 1];
          const d = `M ${a.x + 150} 430 Q ${(a.x + b.x) / 2} 250 ${b.x - 150} 430`;
          const ev = evolvePath(p(b.at - 0.5, 0.6, EASE.inOut), d);
          return <path key={i} d={d} fill="none" stroke={COLORS.blue300} strokeWidth={5} strokeLinecap="round" strokeDasharray={ev.strokeDasharray} strokeDashoffset={ev.strokeDashoffset} />;
        })}
      </svg>
      {PLACES.map((pl, i) => (
        <Enter key={pl.name} delay={pl.at} rise={24} style={{ position: 'absolute', left: pl.x - 220, top: 380 }}>
          <div style={{ width: 440, borderRadius: 32, padding: '30px 36px', boxSizing: 'border-box', background: i === 0 ? COLORS.blue600 : COLORS.white, color: i === 0 ? COLORS.white : COLORS.ink, border: `2px solid ${i === 0 ? COLORS.blue600 : COLORS.neutral150}`, textAlign: 'center' }}>
            <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.12em', opacity: 0.85 }}>0{i + 1} · {pl.verb.toUpperCase()}</div>
            <div style={{ fontSize: 58, fontWeight: 800, letterSpacing: '-0.035em', marginTop: 6 }}>{pl.name}</div>
          </div>
        </Enter>
      ))}
      <Enter delay={2.0} rise={14} style={{ position: 'absolute', left: 0, right: 0, top: 700, textAlign: 'center' }}>
        <div style={{ fontSize: 56, fontWeight: 800, letterSpacing: '-0.03em' }}>
          The patient moves. <span style={{ color: COLORS.blue600 }}>Their history should too.</span>
        </div>
      </Enter>
    </Stage>
  );
};

/* ---------- Lines 52–53: the time we give back ---------- */

export const GiveBackScene: React.FC = () => {
  const { p } = useLocal();
  const side = p(1.3, 0.8, EASE.inOut);
  const timer = p(1.9, 0.5);
  return (
    <Stage>
      <div style={{ position: 'absolute', left: mix(side, 560, 160), top: mix(side, 330, 380), transform: `scale(${mix(side, 1, 0.62)})`, transformOrigin: '0 0' }}>
        <div style={{ fontSize: 300, fontWeight: 800, letterSpacing: '-0.06em', lineHeight: 1, color: COLORS.neutral300 }}>9.7M</div>
        <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.textTertiary, marginTop: 10 }}>people</div>
      </div>
      <div style={{ position: 'absolute', left: 820, top: 330, opacity: timer, transform: `translateY(${mix(timer, 30, 0)}px)` }}>
        <Timer segments={[{ at: 2.0, dur: 1.6, from: 1800, to: 30 }]} size={230} color={COLORS.ink} label="29.5 minutes returned per visit" labelColor={COLORS.blue600} style={{ alignItems: 'flex-start' }} />
      </div>
    </Stage>
  );
};

const EqTerm: React.FC<{ v: string; l: string; at: number; color?: string; size?: number }> = ({ v, l, at, color = COLORS.ink, size = 170 }) => (
  <Enter delay={at} rise={24}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: size, fontWeight: 800, letterSpacing: '-0.05em', lineHeight: 1, color, fontVariantNumeric: 'tabular-nums' }}>{v}</div>
      <div style={{ fontSize: 32, fontWeight: 600, color: COLORS.textSecondary, marginTop: 14 }}>{l}</div>
    </div>
  </Enter>
);

const EqOp: React.FC<{ s: string; at: number }> = ({ s, at }) => (
  <Enter delay={at} rise={0} scaleFrom={0.6}>
    <div style={{ fontSize: 110, fontWeight: 700, color: COLORS.neutral450, margin: '0 30px', transform: 'translateY(20px)' }}>{s}</div>
  </Enter>
);

export const HoursScene: React.FC = () => {
  const hours = useCount(0, 4.7, 1.3, 1.3);
  return (
    <Stage>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 230, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
        <EqTerm v="9.7M" l="encounters" at={0.05} />
        <EqOp s="×" at={0.4} />
        <EqTerm v="29.5" l="minutes each" at={0.5} />
        <EqOp s="=" at={1.0} />
        <EqTerm v={`${hours.toFixed(1)}M+`} l="hours in year one" at={1.1} color={COLORS.blue600} size={220} />
      </div>
      <Enter delay={2.6} rise={14} style={{ position: 'absolute', left: 0, right: 0, top: 640, textAlign: 'center' }}>
        <div style={{ fontSize: 72, fontWeight: 800, letterSpacing: '-0.035em' }}>
          Time that can go back to <span style={{ color: COLORS.blue600 }}>care.</span>
        </div>
      </Enter>
      <Enter delay={3.2} rise={8} style={{ position: 'absolute', left: 0, right: 0, bottom: 40, textAlign: 'center' }}>
        <div style={{ fontSize: 20, color: COLORS.textTertiary }}>
          Illustrative maximum scenario: 9.7M Bitbit-assisted encounters, 30-minute baseline, 30-second target; to be validated in the pilot.
        </div>
      </Enter>
    </Stage>
  );
};

/* ---------- Part 8: close ---------- */

export const SickScene: React.FC = () => (
  <Stage>
    <Enter delay={0.1} rise={-20} style={{ position: 'absolute', left: 160, top: 110 }}>
      <DeskZeroSign light scale={0.6} subtitle="Rizal District Hospital" />
    </Enter>
    <div style={{ position: 'absolute', left: 160, top: 360, width: 980 }}>
      <Enter delay={0.3} rise={24}>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08 }}>Getting sick already takes time from us.</div>
      </Enter>
      <Enter delay={3.1} rise={24} style={{ marginTop: 34 }}>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.08, color: COLORS.blue600 }}>Getting care shouldn&apos;t take more than it needs to.</div>
      </Enter>
    </div>
    <Enter delay={0.6} rise={40} style={{ position: 'absolute', left: 1230, top: 380 }}>
      <ScreenCrop name="02-home" x={20} y={116} w={350} h={208} width={560} />
    </Enter>
  </Stage>
);

/** Lines 55–56 and the end hold, one brand card so nothing re-animates. */
export const ClosingScene: React.FC<{ timerAt: number }> = ({ timerAt }) => (
  <BrandCard footer="SO THE NEXT DESK CAN START FROM HERE" footerAt={2.6}>
    <Enter delay={timerAt} rise={16} style={{ marginTop: 44 }}>
      <Timer segments={[{ at: timerAt + 0.2, dur: 1.6, from: 1800, to: 30 }]} size={110} />
    </Enter>
  </BrandCard>
);
