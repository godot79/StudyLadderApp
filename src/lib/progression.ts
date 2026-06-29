const LEVEL_BAND_ORDER = [
  "Age 9",
  "Age 9 High Achiever",
  "Age 10",
  "Age 10 High Achiever",
  "Age 11",
  "Age 11 High Achiever",
] as const;

export type LevelBand = (typeof LEVEL_BAND_ORDER)[number];

const PROMOTION_SESSIONS_REQUIRED = 3;
const PROMOTION_ACCURACY_THRESHOLD = 0.7;

export function isValidBand(band: string): band is LevelBand {
  return (LEVEL_BAND_ORDER as readonly string[]).includes(band);
}

export function getNextBand(currentBand: string): string | null {
  const idx = (LEVEL_BAND_ORDER as readonly string[]).indexOf(currentBand);
  if (idx === -1 || idx === LEVEL_BAND_ORDER.length - 1) return null;
  return LEVEL_BAND_ORDER[idx + 1];
}

export function computeProgressedBand(
  recentSessions: Array<{ correctCount: number; totalQuestions: number }>,
  currentBand: string
): { newBand: string; promoted: boolean } {
  const next = getNextBand(currentBand);
  if (!next) return { newBand: currentBand, promoted: false };

  if (recentSessions.length < PROMOTION_SESSIONS_REQUIRED) {
    return { newBand: currentBand, promoted: false };
  }

  const qualifies = recentSessions
    .slice(0, PROMOTION_SESSIONS_REQUIRED)
    .every(
      (s) =>
        s.totalQuestions > 0 &&
        s.correctCount / s.totalQuestions >= PROMOTION_ACCURACY_THRESHOLD
    );

  if (qualifies) return { newBand: next, promoted: true };
  return { newBand: currentBand, promoted: false };
}
