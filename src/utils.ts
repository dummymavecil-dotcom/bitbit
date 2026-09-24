/** Pins a visual state for documentation; real apps rely on :active and :focus-visible. */
export type PreviewState = 'pressed' | 'focused';

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

export function stateClass(state?: PreviewState): string | undefined {
  return state === 'pressed' ? 'is-pressed' : state === 'focused' ? 'is-focused' : undefined;
}
