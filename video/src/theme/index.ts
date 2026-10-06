/**
 * Bitbit brand values for video, copied from ../../design-tokens/bitbit.tokens.css.
 * Keep colour jobs exclusive, as in the app: blue = actions/trust, cyan = scan/success,
 * yellow = Self-input only, pink = allergies/destructive only.
 */
import { loadFont } from '@remotion/fonts';
import { staticFile } from 'remotion';

export const COLORS = {
  bg: '#f4f7fb',
  surface: '#ffffff',
  surfaceSunken: '#e8edf5',
  ink: '#0b1b33',
  textSecondary: '#4a5a73',
  textTertiary: '#5e6b80',
  borderSubtle: '#e3e9f2',

  blue100: '#e5f2ff',
  blue200: '#cce6ff',
  blue500: '#0084ff', // brand blue: shapes, rings, icons (never behind small white text)
  blue600: '#0070d9', // fills behind white text
  blue700: '#005bb5',

  cyan100: '#dcfbfa',
  cyan400: '#01dfdc',
  cyan700: '#00706e',

  yellow100: '#fff6cc',
  yellow700: '#6b5400',
  pink100: '#ffe8f1',
  pink700: '#a3164f',

  white: '#ffffff',
} as const;

export const RADIUS = { md: 14, lg: 20, xl: 24, xxl: 28, full: 9999 } as const;

/** Inter variable font, shipped in public/fonts so renders never depend on the network. */
export const FONT_FAMILY = 'Inter';

loadFont({
  family: FONT_FAMILY,
  url: staticFile('fonts/Inter-Variable-latin.woff2'),
  weight: '100 900',
  format: 'woff2',
}).catch((err) => {
  // Fail loudly in Studio; a missing font would silently render in a fallback face.
  console.error('Could not load Inter', err);
});

export const FONT_STACK = `${FONT_FAMILY}, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;

/** Type scale in design pixels (multiply by useScale()). */
export const TYPE = {
  hero: { fontSize: 128, lineHeight: 1.02, fontWeight: 800, letterSpacing: '-0.035em' },
  display: { fontSize: 88, lineHeight: 1.06, fontWeight: 750, letterSpacing: '-0.03em' },
  title: { fontSize: 56, lineHeight: 1.12, fontWeight: 700, letterSpacing: '-0.02em' },
  body: { fontSize: 34, lineHeight: 1.35, fontWeight: 500, letterSpacing: '-0.005em' },
  overline: { fontSize: 24, lineHeight: 1.2, fontWeight: 700, letterSpacing: '0.14em' },
} as const;
