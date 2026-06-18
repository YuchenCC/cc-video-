export const motion = {
  fadeIn: { duration: 0.3 },
  slideUp: { duration: 0.4 },
  slideLeft: { duration: 0.4 },
  popIn: { duration: 0.35 },
  typewriterLine: { duration: 0.6 },
  arrowDraw: { duration: 0.5 },
  highlightPulse: { duration: 0.8 },
  dimOpacity: 0.35,
  scaleFocus: {
    from: 1,
    peak: 1.08,
    to: 1,
  },
} as const

export type MotionPreset = keyof typeof motion
