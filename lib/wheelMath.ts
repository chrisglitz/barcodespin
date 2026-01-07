/**
 * Wheel math calculations for BARCODE SPIN
 * 100 segments = 3.6° per segment
 */

export const SEGMENT_COUNT = 100;
export const DEGREES_PER_SEGMENT = 360 / SEGMENT_COUNT;
export const MIN_SPINS = 6;
export const MAX_SPINS = 10;

/**
 * Calculate the target rotation angle to land on a specific segment
 * @param targetIndex The segment index (0-99) to land on
 * @param currentRotation Current rotation in degrees
 * @returns The final rotation angle in degrees
 */
export function calculateTargetRotation(
  targetIndex: number,
  currentRotation: number = 0
): number {
  // Normalize current rotation to 0-360
  const normalizedCurrent = currentRotation % 360;

  // Calculate the angle for the center of the target segment
  // Pointer is at top (0°), segments go clockwise
  const targetAngle = targetIndex * DEGREES_PER_SEGMENT + DEGREES_PER_SEGMENT / 2;

  // Add random full rotations (6-10 spins)
  const fullRotations = MIN_SPINS + Math.random() * (MAX_SPINS - MIN_SPINS);
  const spinDegrees = fullRotations * 360;

  // Calculate final rotation to land on target
  // We need to rotate to (360 - targetAngle) because we're spinning the wheel
  // and the pointer is stationary at the top
  const finalRotation = normalizedCurrent + spinDegrees + (360 - targetAngle);

  return finalRotation;
}

/**
 * Easing function for smooth deceleration
 * @param t Time progress (0-1)
 * @returns Eased value (0-1)
 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Select a random question index, optionally avoiding used ones
 * @param totalQuestions Total number of questions
 * @param usedIndices Set of used question indices
 * @param avoidRepeats Whether to avoid repeats
 * @returns Selected question index
 */
export function selectRandomQuestion(
  totalQuestions: number,
  usedIndices: Set<number>,
  avoidRepeats: boolean
): number {
  const availableIndices: number[] = [];

  for (let i = 0; i < totalQuestions; i++) {
    if (!avoidRepeats || !usedIndices.has(i)) {
      availableIndices.push(i);
    }
  }

  // If all questions are used and we're avoiding repeats, reset
  if (availableIndices.length === 0) {
    for (let i = 0; i < totalQuestions; i++) {
      availableIndices.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * availableIndices.length);
  return availableIndices[randomIndex];
}

/**
 * Get a shortened display label for a segment
 * @param text Full question text
 * @param maxLength Maximum length
 * @returns Shortened text
 */
export function getSegmentLabel(text: string, maxLength: number = 15): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
}
