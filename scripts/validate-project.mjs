import { access } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const required = [
  'AGENTS.md',
  'README.md',
  'DESIGN.md',
  'docs/PROJECT_MEMORY.md',
  'docs/init.md',
  'docs/STYLE_GUIDE.md',
  'docs/RHYTHM_RULES.md',
  'docs/MOTION_PRESETS.md',
  'docs/SUBTITLE_RULES.md',
  'docs/TRANSITION_RULES.md',
  'docs/STORYBOARD_TEMPLATE.md',
  'docs/ACCEPTANCE_CHECKLIST.md',
  'assets/characters/CHARACTER_CATALOG.md',
  'src/components/README.md',
  'src/components/CheckBadge/README.md',
  'src/components/CheckBadge/styles.css',
  'src/components/StackFrame/README.md',
  'src/components/StackFrame/styles.css',
  'src/components/StackLabel/README.md',
  'src/components/StackLabel/styles.css',
  'src/components/TitleTransition/README.md',
  'src/components/TitleTransition/styles.css',
  'src/components/html.ts',
  'src/components/index.ts',
  'src/styles/colors.ts',
  'src/styles/typography.ts',
  'src/styles/spacing.ts',
  'src/styles/motion.ts',
  'src/styles/runtime.css',
  'src/utils/timing.ts',
  'src/utils/scene.ts',
  'index.html',
  'compositions/concept-expansion.html',
  'compositions/scene-001.html',
  'compositions/scene-002.html',
  'compositions/scene-003.html',
  'compositions/scene-004.html',
  'compositions/scene-005.html',
  'compositions/scene-006.html',
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
