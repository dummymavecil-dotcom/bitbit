import { useWindowedAudioData, visualizeAudio, visualizeAudioWaveform } from '@remotion/media-utils';
import { useCurrentFrame, useVideoConfig } from 'remotion';
import { COLORS } from '../theme';

export type SoundBarsProps = {
  /** The same src you pass to <Audio>, e.g. staticFile('audio/music.mp3'). */
  src: string;
  bars?: number;
  width: number;
  height: number;
  color?: string;
  /**
   * level: loudness over the last ~0.6 s, scrolling (works for any audio, incl. voice-over).
   * spectrum: frequency bands right now (best for full-range music).
   */
  mode?: 'level' | 'spectrum';
  /** Multiplier on bar height. */
  gain?: number;
  /**
   * Frame offset between this component's timeline and the audio's timeline.
   * If <Audio> starts at frame 0 of the composition but this sits inside a Sequence that
   * starts at frame 300, pass 300.
   */
  audioFrameOffset?: number;
};

/**
 * Audio-reactive bars. Reads the real audio data for the current frame, so it stays exactly
 * in sync in Studio and in renders. Copy this pattern for any audio-driven animation.
 */
export const SoundBars: React.FC<SoundBarsProps> = ({
  src,
  bars = 32,
  width,
  height,
  color = COLORS.blue500,
  mode = 'level',
  gain = 1,
  audioFrameOffset = 0,
}) => {
  const frame = useCurrentFrame() + audioFrameOffset;
  const { fps } = useVideoConfig();
  const { audioData, dataOffsetInSeconds } = useWindowedAudioData({ src, frame, fps, windowInSeconds: 10 });
  if (!audioData) return null;

  let values: number[];
  if (mode === 'spectrum') {
    // numberOfSamples must be a power of 2. Low bins hold most musical energy.
    values = visualizeAudio({ fps, frame, audioData, numberOfSamples: 256, optimizeFor: 'speed', dataOffsetInSeconds })
      .slice(0, bars)
      .map((v) => Math.sqrt(v) * 2.5);
  } else {
    // RMS loudness of consecutive slices of the recent waveform, newest on the right.
    const perBar = 24;
    const wave = visualizeAudioWaveform({ fps, frame, audioData, windowInSeconds: 0.6, numberOfSamples: bars * perBar, dataOffsetInSeconds });
    values = Array.from({ length: bars }, (_, i) => {
      const slice = wave.slice(i * perBar, (i + 1) * perBar);
      return Math.sqrt(slice.reduce((sum, v) => sum + v * v, 0) / Math.max(1, slice.length)) * 7;
    });
  }

  const step = width / bars;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {values.map((v, i) => {
        const h = Math.max(step * 0.6, Math.min(1, v * gain) * height);
        return <rect key={i} x={i * step + step * 0.2} y={(height - h) / 2} width={step * 0.6} height={h} rx={step * 0.3} fill={color} />;
      })}
    </svg>
  );
};
