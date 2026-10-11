import { Circle, Rect } from '@remotion/shapes';
import { AnimatedText, Background, Pill, PopShape, Reveal, Scene } from '../../../components';
import { COLORS, TYPE } from '../../../theme';
import { useScale } from '../../../utils/layout';
import type { BitbitIntroProps } from '../schema';

export const TitleScene: React.FC<{ props: BitbitIntroProps }> = ({ props }) => {
  const s = useScale();
  return (
    <Scene background={<Background seed="title" />}>
      {/* Decorative shapes around the edges */}
      <PopShape x={250 * s} y={230 * s} delay={0.35} spin={-60}>
        <Circle radius={70 * s} fill={COLORS.cyan400} />
      </PopShape>
      <PopShape x={1660 * s} y={210 * s} delay={0.5} rotate={14}>
        <Rect width={150 * s} height={150 * s} cornerRadius={36 * s} fill={COLORS.blue500} />
      </PopShape>
      <PopShape x={1720 * s} y={860 * s} delay={0.65}>
        <Circle radius={110 * s} fill="none" stroke={COLORS.blue500} strokeWidth={14 * s} />
      </PopShape>
      <PopShape x={190 * s} y={850 * s} delay={0.8} rotate={-12}>
        <Rect width={110 * s} height={110 * s} cornerRadius={28 * s} fill={COLORS.blue200} />
      </PopShape>

      <Reveal delay={0.1} rise={16 * s}>
        <Pill tone="blue">{props.kicker}</Pill>
      </Reveal>
      <AnimatedText
        text={props.headline}
        by="word"
        delay={0.35}
        stagger={0.09}
        rise={40 * s}
        style={{ ...TYPE.hero, fontSize: TYPE.hero.fontSize * s, marginTop: 44 * s, maxWidth: 1400 * s }}
        highlight={[props.headlineHighlight]}
        highlightStyle={{ color: props.accent }}
      />
    </Scene>
  );
};
