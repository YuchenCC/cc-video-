export const typography = {
  title: {
    fontFamily: '"Noto Sans CJK SC", "PingFang SC", Inter, sans-serif',
    fontWeight: 600,
  },
  label: {
    fontFamily: '"Noto Sans CJK SC", "PingFang SC", Inter, sans-serif',
    fontWeight: 500,
  },
  body: {
    fontFamily: '"Noto Sans CJK SC", "PingFang SC", Inter, sans-serif',
    fontWeight: 400,
  },
  subtitle: {
    fontFamily: '"Noto Sans CJK SC", "PingFang SC", Inter, sans-serif',
    fontWeight: 400,
    color: '#FFFFFF',
  },
  code: {
    fontFamily: '"JetBrains Mono", Menlo, "Fira Code", monospace',
    fontWeight: 400,
  },
} as const

export type TypographyToken = keyof typeof typography
