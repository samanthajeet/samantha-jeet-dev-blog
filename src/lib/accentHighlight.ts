const ACCENT_HIGHLIGHT_CLASSES = [
  'bg-primary/20',
  'bg-secondary/20',
  'bg-tertiary/20',
  'bg-retroBlue/20',
] as const;

/** Deterministic accent class from a stable seed (no randomness during render). */
export function accentHighlightClass(seed: string): (typeof ACCENT_HIGHLIGHT_CLASSES)[number] {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) | 0;
  return ACCENT_HIGHLIGHT_CLASSES[Math.abs(h) % ACCENT_HIGHLIGHT_CLASSES.length];
}
