import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const required = [
  'README.md',
  'DESIGN.md',
  'docs/PROJECT_MEMORY.md',
  'docs/STYLE_GUIDE.md',
  'docs/RHYTHM_RULES.md',
  'docs/MOTION_PRESETS.md',
  'docs/SUBTITLE_RULES.md',
  'docs/TRANSITION_RULES.md',
  'docs/STORYBOARD_TEMPLATE.md',
  'docs/ACCEPTANCE_CHECKLIST.md',
  'src/styles/colors.ts',
  'src/styles/typography.ts',
  'src/styles/spacing.ts',
  'src/styles/motion.ts',
  'src/utils/timing.ts',
  'src/utils/scene.ts',
]

const missing = []
for (const path of required) {
  try {
    await access(resolve(root, path))
  } catch {
    missing.push(path)
  }
}

if (missing.length > 0) {
  console.error(`Missing required files:\n${missing.join('\n')}`)
  process.exitCode = 1
} else {
  console.log(`Project structure check passed (${required.length} required files).`)
}
