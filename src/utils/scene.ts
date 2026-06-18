export const transitionNames = [
  'fadeToNext',
  'slideReplace',
  'wipeSoft',
  'zoomSlight',
  'objectMorph',
  'localReplace',
] as const

export type TransitionName = (typeof transitionNames)[number]

export interface SceneCue {
  timeSeconds: number
  motion: string
  description: string
}

export interface SceneDefinition {
  id: `scene-${string}`
  concept: string
  voiceover: string
  subtitle: string
  durationSeconds: number
  transition: TransitionName
  cues: SceneCue[]
}

export const sortSceneCues = (cues: SceneCue[]): SceneCue[] =>
  [...cues].sort((a, b) => a.timeSeconds - b.timeSeconds)
