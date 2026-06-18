export const DEFAULT_FPS = 30
export const MIN_SCENE_SECONDS = 8
export const MAX_SCENE_SECONDS = 20
export const MIN_VISUAL_CHANGE_SECONDS = 2
export const MAX_VISUAL_CHANGE_SECONDS = 4

export const secondsToFrames = (
  seconds: number,
  fps: number = DEFAULT_FPS,
): number => Math.round(seconds * fps)

export const framesToSeconds = (
  frames: number,
  fps: number = DEFAULT_FPS,
): number => frames / fps

export const isRecommendedSceneDuration = (seconds: number): boolean =>
  seconds >= MIN_SCENE_SECONDS && seconds <= MAX_SCENE_SECONDS
